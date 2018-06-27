export function normalizePath(path: string) {
    if (/\/$/.test(path)) {
        path = path.slice(0, -1);
    }
    path = (path || '').toLowerCase();
    if (!/^\//.test(path)) {
        path = '/' + path
    }
    return path;
}

export function testUrl(url: string, paths: string[]): TestUrlResult {
    for (let path of paths) {
        const regex = new RegExp(`^${path}`);
        if (regex.test(url)) {
            const trimmedUrl = url.replace(regex, '');
            console.log(trimmedUrl);
            return {
                success: true,
                trimmedUrl: trimmedUrl
            }
        }

    }
    return {
        success: false,
        trimmedUrl: url
    }
}

interface TestUrlResult {
    success: boolean;
    trimmedUrl: string;
}