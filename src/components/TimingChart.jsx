"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const TimingChart = ({ dates, prices, volumes, recommendations, apexChartsLoaded, }) => {
    const chartRef = (0, react_1.useRef)(null);
    const chartInstance = (0, react_1.useRef)(null);
    (0, react_1.useEffect)(() => {
        if (!apexChartsLoaded || !chartRef.current)
            return;
        // 기존 차트 정리
        if (chartInstance.current) {
            chartInstance.current.destroy();
        }
        const buyPoints = dates.filter((_, i) => recommendations[i] === "매수");
        const buyPrices = prices.filter((_, i) => recommendations[i] === "매수");
        // 데이터 검증 및 기본값 처리
        const validPrices = prices.map((price) => isNaN(price) || price === undefined ? 0 : price);
        const validVolumes = volumes.map((volume) => isNaN(volume) || volume === undefined ? 0 : volume);
        const validBuyPrices = buyPrices.map((price) => isNaN(price) || price === undefined ? 0 : price);
        const validDates = dates.filter((date) => date && date.trim() !== "");
        const validBuyPoints = buyPoints.filter((date) => date && date.trim() !== "");
        const options = {
            chart: {
                type: "line",
                height: 600,
                toolbar: {
                    show: false,
                },
            },
            series: [
                {
                    name: "배출권 가격",
                    type: "line",
                    data: validPrices.map((price, index) => ({
                        x: validDates[index] || index,
                        y: price,
                    })),
                },
                {
                    name: "매수 추천",
                    type: "scatter",
                    data: validBuyPrices.map((price, index) => ({
                        x: validBuyPoints[index] || index,
                        y: price,
                    })),
                },
                {
                    name: "거래량",
                    type: "column",
                    data: validVolumes.map((volume, index) => ({
                        x: validDates[index] || index,
                        y: volume,
                    })),
                },
            ],
            xaxis: {
                type: "datetime",
                title: {
                    text: "날짜",
                },
            },
            yaxis: [
                {
                    title: {
                        text: "가격 (원)",
                    },
                    min: 0,
                    max: Math.max(...validPrices) * 1.1,
                },
                {
                    opposite: true,
                    title: {
                        text: "거래량",
                    },
                    min: 0,
                    max: Math.max(...validVolumes) * 1.1,
                },
            ],
            title: {
                text: "최적 매수 타이밍 분석",
                align: "center",
            },
            colors: ["#1f77b4", "#ef4444", "#93c5fd"],
            stroke: {
                width: 2,
            },
            markers: {
                size: 6,
            },
        };
        chartInstance.current = new window.ApexCharts(chartRef.current, options);
        chartInstance.current.render();
        return () => {
            if (chartInstance.current) {
                chartInstance.current.destroy();
            }
        };
    }, [dates, prices, volumes, recommendations, apexChartsLoaded]);
    if (!apexChartsLoaded) {
        return <div>차트 준비 중입니다...</div>;
    }
    if (!dates || dates.length === 0 || !prices || prices.length === 0) {
        return <div>매수 타이밍 데이터가 없습니다.</div>;
    }
    return <div ref={chartRef}/>;
};
exports.default = TimingChart;
