const http = require('k6/http');
const { check, group, sleep } = require('k6');

export const options = {
    discardResponseBodies: true,
    scenarios: {
        contacts: {
            executor: 'constant-arrival-rate',
            rate: 40,
            duration: '20s',
            preAllocatedVUs: 5000,
            // maxVUs: 100,
        },
    },
};

const SLEEP_DURATION = 0.1;
const body = JSON.stringify({
    url: 'https://school.appworks.tw/',
});
const params = {
    headers: {
        'Content-Type': 'application/json',
    },
};

export default function () {
    // Login request
    const res = http.post('http://54.248.151.151/shortUrlByCache', body, params);
    check(res, {
        'status was 200': (r) => r.status == 200,
    });
    sleep(SLEEP_DURATION);
}
