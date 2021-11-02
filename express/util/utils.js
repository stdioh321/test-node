function redirectAfterTime(response, { time = 1000, message = "ok", url = "/" } = {}) {
    const script = `<script>setTimeout(()=>{location="${url}";},${time});</script>`;
    return response.send(`${message}${script}`);
}


module.exports.redirectAfterTime = redirectAfterTime;