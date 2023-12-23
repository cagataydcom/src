module.exports = new class Schema {
    user = (arg, stat) => {
        return {
            id: arg?.id || NaN,
            avatar: arg?.avatar || "https://cdn.cagatayd.com/assets/img/avatar/user.png",
            username: arg?.username || "",
            mail: arg?.mail || "",
            createdAt: arg?.createdAt || null,
            ...(stat ? {
                uuid: arg?.uuid || "",
                updateAt: arg?.updateAt || null
            } : {})
        }
    };


    oauth_authorization_code = (arg, id) => {
        return {
            access_token: (arg?.accessToken ? btoa(id + "-" + arg?.accessToken) : null),
            refresh_token: (arg?.refreshToken ? btoa(id + "-" + arg?.refreshToken) : null),
            scope: arg?.scope,
            token_type: "Bearer",
            expires_in: null
        }
    }
}