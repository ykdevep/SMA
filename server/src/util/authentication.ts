export const Authentication = async ({headers: {authorization}}, Users) => {

    if (authorization) {
        const HEADER_REGEX = /Bearer (.*)$/;
        const headerToken = HEADER_REGEX.exec(authorization)[1];
        return await Users.findOne({token: headerToken});
    } else {
        return null;
    }
};
