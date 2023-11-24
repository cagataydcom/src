module.exports = new class Schema {
    user = (arg, stat) => {
        return {
            id: arg?.id || NaN,
            avatar: arg?.avatar || "",
            username: arg?.username || "",
            mail: arg?.mail || "",
            createdAt: arg?.createdAt || null,
            ...(stat ? {
                uuid: arg?.uuid || "",
                updateAt: arg?.updateAt || null
            } : {})
        }
    };


    oauth_authorization_code = (arg) => {
        return {
            access_token: arg?.accessToken,
            refresh_token: arg?.refreshToken,
            scope: arg?.scope,
            token_type: "Bearer",
            expires_in: null
        }
    }
}