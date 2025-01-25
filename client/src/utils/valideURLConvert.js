export const valideURLconvert = (name) => {
    const url = name?.toString().replaceAll(" ", "-").replaceAll(",", "-").replaceAll("&", "-");
    // const url2 = url.toString().replaceAll("-", "-").replaceAll("--", "-").replaceAll("---", "-").replaceAll("----", "-");
    return url;
}