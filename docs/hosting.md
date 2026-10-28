# Documentation hosting

The site is configured for **https://models.opensr.eu/** using MkDocs Material and
GitHub Pages. The repository configuration is ready; GitHub settings, STRATO
DNS, and the first successful hosted deployment are still pending owner setup.

## Deployment workflow

`.github/workflows/docs.yml` builds and deploys on pushes to `main` that change
`docs/`, the MkDocs configuration, the workflow, README, or public status file.
The **documentation** workflow also has a manual run button for `main`.

The build installs only MkDocs Material with Python/uv, runs `mkdocs build
--strict`, and uploads the generated site. A separate deployment job uses
GitHub's Pages service. It does not install Torch, fetch checkpoints, or run
model evaluations. There is no periodic schedule and no generated `gh-pages`
branch to maintain.

## GitHub Pages and DNS configuration

For the configured repository `ESAOpenSR/opensr-model-zoo`:

1. Push the repository changes to `main`. In **Settings → Pages → Build and
   deployment**, choose **GitHub Actions** as the source.
2. Under **Custom domain**, enter **`models.opensr.eu`** and save it.
3. In STRATO DNS for `opensr.eu`, add the subdomain record:

   | Type | Name / host | Target |
   | --- | --- | --- |
   | CNAME | `models` | `esaopensr.github.io` |

   The target is the GitHub organization Pages hostname, without a scheme,
   repository path, or `/opensr-model-zoo` suffix. If the repository owner
   changes, use that owner's `<owner>.github.io` hostname instead.
4. Once GitHub validates DNS and provisions the certificate, enable **Enforce
   HTTPS** in Pages settings.
5. Run **Actions → documentation → Run workflow → main**, or push a docs change.
   Confirm the build and deploy jobs succeed and open **https://models.opensr.eu/**.
   Check the home page, a nested model page, image gallery, and comparison table.

`mkdocs.yml` sets the canonical site URL, and `docs/CNAME` records the intended
hostname in the generated site. With Actions-based publishing, that file does
not configure the repository's custom domain: the GitHub Pages setting above
is required. See GitHub's [custom-domain instructions](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site)
and [custom-workflow guide](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages).

## Local preview

In the prepared documentation environment:

```bash
uv run --no-sync mkdocs serve
uv run --no-sync mkdocs build --strict
```

The generated `site/` directory is ignored. A local build verifies the site
files; hosted deployment and DNS/HTTPS are checked after owner setup.
