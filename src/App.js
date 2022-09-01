import "./App.css";

import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "/node_modules/primeflex/primeflex.css";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";

import { useState, useEffect, React } from "react";

export default function App() {
  const [status, setStatus] = useState("stop");
  const [sure, setSure] = useState(0);
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setSure((prev) => prev + 1);
    }, 1000);

    if (status === "stop") {
      clearInterval(interval);
      setSure(0);
    }

    if (status === "waiting") {
      clearInterval(interval);
      return;
    }

    return () => clearInterval(interval);
  }, [status]);

  const baslat = () => {
    setStatus("countinues");
  };

  const durdur = () => {
    setStatus("waiting");
    setDialogOpen(true);
  };

  const sifirla = () => {
    setStatus("stop");
    setDialogOpen(false);
  };

  const devamEt = () => {
    setStatus("countinues");
    setDialogOpen(false);
  };

  return (
    <>
      <div className="grid justify-content-center mt-7">
        <div className="grid field col-12 justify-content-center ">
          <span
            id="sureNum"
            className="text-7xl py-1 px-3 border-round-3xl"
            style={{
              fontFamily: "Digital-7",
              color: "#ffa733",
              backgroundColor: "#494a4a",
            }}
          >
            <span className="">
              {(sure / 60 < 10 ? "0" : "") + Math.floor(sure / 60)}:
            </span>
            <span className="">
              {(sure % 60 < 10 ? "0" : "") + Math.floor(sure % 60)}
            </span>
          </span>
        </div>
        <div className="grid field col-12 justify-content-center gap-3">
          <Button
            className="p-button-rounded p-button-secondary"
            label="Başlat"
            onClick={baslat}
            icon="pi pi-caret-right"
            iconPos="left"
            disabled={status !== "stop"}
          ></Button>
          <Button
            className="p-button-rounded p-button-secondary"
            label="Durdur"
            onClick={durdur}
            icon="pi pi-pause"
            iconPos="left"
            disabled={status !== "countinues"}
          ></Button>
        </div>
      </div>
      <div className="">
        <Dialog
          visible={dialogOpen}
          className="flex flex-wrap w-3"
          onHide={devamEt}
          headerClassName="h-1rem p-0 m-0"
          position="center"
        >
          <p className="text-lg">
            Geçen süre: {Math.floor(sure / 60)} dakika {sure % 60} saniye
          </p>
          <div className="flex gap-3">
            <Button
              className="p-button-rounded p-button-secondary md:w-full"
              label="Devam Et"
              icon="pi pi-forward"
              iconPos="left"
              onClick={devamEt}
            ></Button>
            <Button
              className="p-button-rounded p-button-secondary md:w-full "
              label="Sıfırla"
              icon="pi pi-refresh"
              iconPos="left"
              onClick={sifirla}
            ></Button>
          </div>
        </Dialog>
      </div>
    </>
  );
}
