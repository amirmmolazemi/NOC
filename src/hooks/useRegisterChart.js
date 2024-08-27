import {
  Chart,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
  ArcElement,
  RadialLinearScale,
} from "chart.js";
import { useEffect } from "react";
const useRegisterChart = () => {
  useEffect(() => {
    Chart.register(
      CategoryScale,
      LinearScale,
      BarElement,
      Title,
      Tooltip,
      Legend,
      PointElement,
      LineElement,
      ArcElement,
      RadialLinearScale
    );
  }, []);
};

export default useRegisterChart;
