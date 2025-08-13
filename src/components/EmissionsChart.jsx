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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const EmissionsChart = ({ data, selectedYear, }) => {
    const chartRef = (0, react_1.useRef)(null);
    const chartInstance = (0, react_1.useRef)(null);
    const [apexChartsLoaded, setApexChartsLoaded] = (0, react_1.useState)(false);
    // ApexCharts 동적 로드
    (0, react_1.useEffect)(() => {
        const loadApexCharts = () => __awaiter(void 0, void 0, void 0, function* () {
            if (window.ApexCharts) {
                setApexChartsLoaded(true);
                return;
            }
            try {
                // CDN에서 ApexCharts 로드
                const script = document.createElement("script");
                script.src =
                    "https://cdn.jsdelivr.net/npm/apexcharts@3.45.1/dist/apexcharts.min.js";
                script.onload = () => setApexChartsLoaded(true);
                script.onerror = () => console.error("ApexCharts 로드 실패");
                document.head.appendChild(script);
            }
            catch (error) {
                console.error("ApexCharts 로드 중 오류:", error);
            }
        });
        loadApexCharts();
    }, []);
    (0, react_1.useEffect)(() => {
        if (!apexChartsLoaded || !chartRef.current || !data.length)
            return;
        // 기존 차트 정리
        if (chartInstance.current) {
            chartInstance.current.destroy();
        }
        const selectedData = data.find((item) => item.year === selectedYear) || data[0];
        // 데이터 검증 및 기본값 처리
        const validData = [
            {
                name: "에너지",
                value: isNaN(selectedData.energy) ? 0 : selectedData.energy,
            },
            {
                name: "수송",
                value: isNaN(selectedData.transport) ? 0 : selectedData.transport,
            },
            {
                name: "산업공정",
                value: isNaN(selectedData.industry) ? 0 : selectedData.industry,
            },
            {
                name: "농업",
                value: isNaN(selectedData.agriculture) ? 0 : selectedData.agriculture,
            },
            {
                name: "폐기물",
                value: isNaN(selectedData.waste) ? 0 : selectedData.waste,
            },
        ];
        const options = {
            chart: {
                type: "pie",
                height: 400,
                toolbar: {
                    show: false,
                },
            },
            series: validData.map((item) => item.value),
            labels: validData.map((item) => item.name),
            colors: ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6"],
            legend: {
                position: "bottom",
                fontSize: "14px",
            },
            title: {
                text: `${selectedYear}년 온실가스 배출량`,
                align: "center",
                style: {
                    fontSize: "16px",
                    fontWeight: "bold",
                },
            },
            dataLabels: {
                enabled: true,
                formatter: function (val) {
                    return val.toFixed(1) + "%";
                },
            },
            responsive: [
                {
                    breakpoint: 768,
                    options: {
                        chart: {
                            height: 300,
                        },
                        legend: {
                            position: "bottom",
                        },
                    },
                },
            ],
        };
        chartInstance.current = new window.ApexCharts(chartRef.current, options);
        chartInstance.current.render();
        return () => {
            if (chartInstance.current) {
                chartInstance.current.destroy();
            }
        };
    }, [data, selectedYear, apexChartsLoaded]);
    if (!apexChartsLoaded) {
        return (<div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">차트 준비 중입니다...</p>
          </div>
        </div>
      </div>);
    }
    if (!data || data.length === 0) {
        return (<div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <p className="text-gray-600">배출량 데이터가 없습니다.</p>
          </div>
        </div>
      </div>);
    }
    return (<div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
      <div ref={chartRef}/>
    </div>);
};
exports.default = EmissionsChart;
