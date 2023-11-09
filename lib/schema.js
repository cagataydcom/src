module.exports = new class Schema {
    user = (arg) => { return { id: arg?.id || 0, uuid: arg?._uuid || "", username: arg?.username || "" } };
}