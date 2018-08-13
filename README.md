## The Atlanta Photojournalism Seminar Website

This repository contains the source code for the Atlanta Photojournalism Seminar website. It is built using [Middleman](http://middlemanapp.com), a static site generator.

### Running the Site Locally

You can run the site locally by issuing the following commands:

```bash
$ git clone https://github.com/photojournalism/photojournalism.org
$ cd photojournalism.org
$ bundle install
$ bundle exec middleman
```

### Deploying the Site

Copy the `script/setup.example` file to `script/setup`, and update the `user`, `server`, `port`, and path to where you'd like it to be pushed to on the server (which must be a bare git repository). For example:

```
me@example.com:22:/var/www/website.git
```

Then run `script/deploy` from the root of the repository. This will push the website to the remote bare git repository. You can setup a `post-receive` hook inside of your bare git repository that will check the repository out to any directory on the server (which you can then serve with any webserver), for example:

```
#!/bin/sh
GIT_WORK_TREE=/var/www/site git checkout -f
```