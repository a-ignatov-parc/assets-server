# assets-server
Simple assets server with support for middleware fabric


# Usage

```bash
assets-server [options]
```

# Options

    -h, --help               output usage information
    -V, --version            output the version number
    -p, --port <value>       The port on which the assets server will respond
    -H, --hostname <name>    The hostname the assets server will use
    -b, --base <path>        The base (or root) directory from which files will be served
    -m, --middleware <path>  This option expects a path to CommonJS module which will return function that returns an array of middlewares
