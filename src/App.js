import logo from './logo.svg';
import './App.css';

import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import '/node_modules/primeflex/primeflex.css';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';

import { useState, useEffect, useRef, React } from 'react';


export default function App() {

  const zamanlayici = useRef();
  const [sure, setSure] = useState(0);
  const [dialogOpen, setDialogOpen] = useState(false);


  const baslat = () => {
    zamanlayici.current = setInterval(() => {
      setSure(prev => prev + 1);
    }, 1000)
  }

  const durdur = () => {
    clearInterval(zamanlayici.current); //
    zamanlayici.current = 0;
    setDialogOpen(true);
  }

  const sifirla = () => {
    durdur();
    setSure(0);
  }

  return (
    <>
      <div className='grid justify-content-center mt-7'>
        <div className='grid field col-12 justify-content-center '>
          <span id='sureNum' className='text-7xl py-1 px-3 border-round-3xl' style={{ fontFamily: 'Digital-7', color: '#ffa733', backgroundColor: '#494a4a' }}>
            <span className="" >
              {((sure / 60 < 10 ? "0" : '') + Math.floor((sure / 60)))}:
            </span>
            <span className="">
              {((sure % 60 < 10 ? "0" : '') + Math.floor((sure % 60)))}
            </span>
          </span>
        </div>
        <div className='grid field col-12 justify-content-center gap-3'>
          <Button className='p-button-rounded p-button-secondary' label='Başlat' onClick={baslat} icon='pi pi-caret-right' iconPos='left'></Button>
          <Button className='p-button-rounded p-button-secondary' label='Durdur' onClick={durdur} icon='pi pi-pause' iconPos='left'></Button>
        </div>
      </div>
      <div className=''>
        <Dialog visible={dialogOpen}
          className="flex flex-wrap w-3"
          onHide={() => { setDialogOpen(false) }}
          headerClassName='h-1rem p-0 m-0'
          closable={false}
          position="center"
        >
          <p className='text-lg'>Geçen süre: {Math.floor(sure / 60)} dakika {sure % 60} saniye</p>
          <div className='flex gap-3'>
            <Button className='p-button-rounded p-button-secondary md:w-full' label='Devam Et' icon='pi pi-forward' iconPos='left' onClick={() => { setDialogOpen(false); baslat() }}></Button>
            <Button className='p-button-rounded p-button-secondary md:w-full ' label='Sıfırla' icon='pi pi-refresh' iconPos='left' onClick={() => { sifirla(); setDialogOpen(false) }}></Button>
          </div>
        </Dialog>
      </div>
    </>
  )
}
