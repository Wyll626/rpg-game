import PhaserGame from "./components/PhaserGame";

function App() {

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignContent: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          justifyContent: "center",
          flexDirection: "row",
          display: "flex",
          marginBottom: 30,
        }}
      >
        <PhaserGame />
      </div>

    </div>
  );
}

export default App;
