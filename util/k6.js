import http from 'k6/http';
import { check, group, sleep } from 'k6';

const shortUrl = [
    // short urls stored in database
];

function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const options = {
    discardResponseBodies: true,
    scenarios: {
        contacts: {
            executor: 'constant-arrival-rate',
            rate: 250,
            timeUnit: '1s',
            duration: '20s',
            preAllocatedVUs: 10000,
        },
    },
};

const SLEEP_DURATION = 0.1;
const body = JSON.stringify({
    url: 'https://www.google.com.tw/',
});
const params = {
    headers: {
        'Content-Type': 'application/json',
    },
};

// function for getting redirect from server
export default function () {
    // Login request
    // const url = shortUrl[getRandom(0, shortUrl.length - 1)];
    const res = http.post(http://systemdesign-1586369773.ap-northeast-1.elb.amazonaws.com/shortUrlUnique, body, params);
    check(res, {
        'status was 200': (r) => r.status == 200,
    });
    sleep(SLEEP_DURATION);
}

// function for establishing new short url 
// export default function () {
//     // Login request
//     const url = shortUrl[getRandom(0, shortUrl.length - 1)];
//     const res = http.get(http://systemdesign-1586369773.ap-northeast-1.elb.amazonaws.com/shortUrlUnique/${url});
//     check(res, {
//         'status was 200': (r) => r.status == 200,
//     });
//     sleep(SLEEP_DURATION);
// }
