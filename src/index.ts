import { $fetch } from 'ofetch';
import { format, formatDistance, parseISO } from 'date-fns';
import { asciiPrint } from '@shba007/unascii';
import ora from 'ora';
import type { FrameworkName } from './types';
import frameworks from './frameworks.json';

export function getColor(framework: FrameworkName) {
  return frameworks[framework].color;
}

export async function getImage(framework: FrameworkName) {
  const print = await asciiPrint(
    `https://raw.githubusercontent.com/shba007/unstack/refs/heads/main/public/logos/${framework}.svg`,
    { output: 'console', width: 24, widthSkew: 2 },
  );
  return print.getImage();
}

function getVersion(version: string | undefined, updatedAt: any): string | undefined {
  return version
    ? `${version} (${formatDistance(parseISO(updatedAt[version]), new Date(), {
        addSuffix: true,
      })})`
    : undefined;
}

export async function getDetails(framework: FrameworkName) {
  const spinner = ora('Loading Details').start(),
    { name, repo, pkg, publishedAt, author, website, initCommend } = frameworks[framework],
    [{ repo: details }, release] = await Promise.all([
      $fetch(`/repos/${repo}`, { baseURL: 'https://ungh.cc' }),
      $fetch(`/${pkg}`, { baseURL: 'https://registry.npmjs.org' }),
    ]);

  spinner.succeed('Loaded Details');
  const { description: repoDescription, stars } = details,
    { description: releaseDescription, time: updatedAt } = release,
    versions = release['dist-tags'];

  return {
    author,
    description: repoDescription ?? releaseDescription,
    github: `https://github.com/${repo}`,
    initCommend,
    name,
    npm: `https://www.npmjs.com/package/${pkg}`,
    publishedAt: `${format(parseISO(publishedAt), 'dd MMM, yyyy')} (${formatDistance(
      parseISO(publishedAt),
      new Date(),
      {
        addSuffix: true,
      },
    )})`,
    stars,
    version: {
      next:
        new Date(updatedAt[versions.next]).getTime() >
        new Date(updatedAt[versions.latest]).getTime()
          ? getVersion(versions.next, updatedAt)
          : undefined,
      stable: getVersion(versions.latest, updatedAt),
    },
    website,
  };
}