export default function isActive(url: string, pathname: string): boolean {
    return url === pathname || (url !== "/" && pathname.startsWith(`${url}/`));
}