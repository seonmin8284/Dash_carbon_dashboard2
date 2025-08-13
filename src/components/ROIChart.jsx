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
const ROIChart = ({ apexChartsLoaded }) => {
    const chartRef = (0, react_1.useRef)(null);
    const chartInstance = (0, react_1.useRef)(null);
    (0, react_1.useEffect)(() => {
        if (!apexChartsLoaded || !chartRef.current)
            return;
        // 기존 차트 정리
        if (chartInstance.current) {
            chartInstance.current.destroy();
        }
        const strategies = [
            "배출권 구매",
            "에너지 효율",
            "재생에너지",
            "탄소 포집",
        ];
        const rois = [8, 15, 25, 30];
        // 데이터 검증 및 기본값 처리
        const validRois = rois.map((roi) => isNaN(roi) || roi === undefined ? 0 : roi);
        const options = {
            chart: {
                type: "bar",
                height: 400,
                toolbar: {
                    show: false,
                },
            },
            series: [
                {
                    name: "ROI (%)",
                    data: validRois,
                },
            ],
            xaxis: {
                categories: strategies,
                title: {
                    text: "전략",
                },
            },
            yaxis: {
                title: {
                    text: "ROI (%)",
                },
                min: 0,
                max: Math.max(...validRois) * 1.1,
            },
            title: {
                text: "전략별 ROI 비교",
                align: "center",
            },
            colors: ["#3b82f6"],
            plotOptions: {
                bar: {
                    horizontal: false,
                    columnWidth: "70%",
                },
            },
            dataLabels: {
                enabled: true,
                formatter: function (val) {
                    return val + "%";
                },
            },
        };
        chartInstance.current = new window.ApexCharts(chartRef.current, options);
        chartInstance.current.render();
        return () => {
            if (chartInstance.current) {
                chartInstance.current.destroy();
            }
        };
    }, [apexChartsLoaded]);
    if (!apexChartsLoaded) {
        return <div>차트 준비 중입니다...</div>;
    }
    return <div ref={chartRef}/>;
};
exports.default = ROIChart;
