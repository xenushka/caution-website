# [caution.co](https://caution.co)

Web page source.

## Instructions

0. If the repo was not cloned with submodules:

```shell
$ git submodule update --init --recursive
```

1. Install `make`.
2. Install `docker`
3. Build (export) site to `_site` directory:

```shell
$ make build
```

4. Serve site at `0.0.0.0:4000`:

```shell
$ make serve
```

### Generate Static Files

1. Output static files in `_site` directory:

```shell
$ make _site
```

### Cleanup

1. Remove all build artifacts:

```shell
$ make fullclean
```
