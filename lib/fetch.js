const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

module.exports = (...arg) => new Promise(async b => {
    if (!arg[1]) arg[1] = {};
    if (arg[1]?._makeForm) { let form = new FormData(); for (let key in arg[1].body) { form.append(key, arg[1].body[key]) }; arg[1].body = form }

    try {
        let c = await fetch(arg[0], arg[1]);
        if (!arg[2]) c = await c.json();
        return b({ success: true, response: c });
    } catch (d) { return b({ success: false, error: d }) }
})