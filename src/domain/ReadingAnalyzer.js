class ReadingAnalyzer {
    detectSuspicious(readings) {
        const groups = readings.reduce((acc, r) => {
            acc[r.clientId] = acc[r.clientId] || [];
            acc[r.clientId].push(r);
            return acc;
        }, {});

        const result = [];
        for (const clientId in groups) {
            const arr = groups[clientId].map(r => r.value).sort((a, b) => a - b);
            const n = arr.length;
            const median = n % 2 === 1 ? arr[Math.floor(n/2)] : (arr[n/2 - 1] + arr[n/2]) / 2;
            const sup = median * 1.5;
            const inf = median * 0.5;

            for (const r of groups[clientId]) {
                if (r.value > sup || r.value < inf) {
                    result.push({
                        clientId,
                        period: r.period,
                        value: r.value,
                        median
                    });
                }
            }
        }
        return result;
    }
}

module.exports = ReadingAnalyzer;
  