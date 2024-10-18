import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import { Bar } from "react-chartjs-2";
import VerticalSelector from "./vertical-selector";
import { useMemo, useState } from "react";

Chart.register(CategoryScale);

export const Charts = ({
  longTermArtistData,
  longTermTracksData,
  longTermTracksByAlbum,
}) => {
  const options = ["Top albums", "Artist popularity"];
  const [selectedOption, setSelectedOption] = useState(options[0]);
  const a = "";
  console.log({
    longTermArtistData,
    longTermTracksData,
    longTermTracksByAlbum,
  });
  const topAlbums = Object.values(longTermTracksByAlbum).sort(
    (a, b) => b.tracks.length - a.tracks.length,
  );
  const topAlbumsData = topAlbums.map((album, i) => {
    const label = album.album.name;
    return {
      album: label,
      position: album.tracks.length,
    };
  });
  const topArtistsData = longTermArtistData.body.items.sort(
    (a, b) => b.popularity - a.popularity,
  );
  const borderColor = 'rgb(163 230 53)';
  const backgroundColor = 'rgb(101 163 13)';

  // debugger;
  const { ChartComponent } = useMemo(() => {
    if (selectedOption === options[0]) {
      const chartData = {
        labels: topAlbumsData.map((data, i) => {
          const label = `#${i + 1} ${data.album}`;
          return label.length > 20 ? label.slice(0, 20) + "..." : label;
        }),
        datasets: [
          {
            label: "Top songs in this album",
            data: topAlbumsData.map((data) => data.position),
            backgroundColor,
            borderColor,
            borderWidth: 1,
            barThickness: 27,
            borderRadius: 2,
          },
        ],
      };
      return {
        ChartComponent: () => (
          <Bar
            className="w-full"
            data={chartData}
            options={{
              indexAxis: "y",
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  display: false,
                },
              },
              scales: {
                y: {
                  beginAtZero: true,
                  grid: {
                    display: false,
                  },
                  ticks: {
                    color: "#94a3b8",
                  },
                },
                x: {
                  grid: {
                    display: false,
                  },
                  ticks: {
                    color: "#94a3b8",
                    stepSize: 1,
                  },
                },
              },
            }}
          />
        ),
        chartData,
      };
    }
    if (selectedOption === options[1]) {
      const chartData = {
        labels: topArtistsData.map((data, i) => {
          const label = `#${i + 1} ${data.name}`;
          return label.length > 20 ? label.slice(0, 20) + "..." : label;
        }),
        datasets: [
          {
            label: "Top artists by popularity",
            data: topArtistsData.map((data) => data.popularity),
            backgroundColor,
            borderColor,
            borderWidth: 1,
            barThickness: 27,
            borderRadius: 2,
          },
        ],
      };
      return {
        ChartComponent: () => (
          <Bar
            className="w-full"
            data={chartData}
            options={{
              indexAxis: "y",
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  display: false,
                },
              },
              scales: {
                y: {
                  beginAtZero: true,
                  grid: {
                    display: false,
                  },
                  ticks: {
                    color: "#94a3b8",
                  },
                },
                x: {
                  grid: {
                    display: false,
                  },
                  ticks: {
                    stepSize: 1,
                    color: "#94a3b8",
                  },
                },
              },
            }}
          />
        ),
      };
    }
  }, [options]);

  return (
    <div className="flex items-start gap-2">
      <VerticalSelector
        className="w-fit justify-start"
        options={options}
        selectedOption={selectedOption}
        setSelectedOption={setSelectedOption}
      />

      <div
        className="chart-container"
        style={{ width: "100%", height: "1500px" }}
      >
        <ChartComponent />
      </div>
    </div>
  );
};

export default Charts;
