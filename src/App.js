import React, {useEffect,useState} from 'react';
import { useLoadScript,GoogleMap,Marker } from '@react-google-maps/api';
import  './App.css';
import CitiesService from './fetch-cities';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import './dataTable.css';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';


const libraries = ["places"]

  
  const mapContainerStyle={
    width: "100vw",
    height: "100vh",
  }
const center ={
  lat:39.933365 ,
  lng: 32.859741,
}
const options={
  disableDefaultUI:true,
  zoomControl:true
}

const itemTemplate = (item) => {
  return (
      <div className="product-item">
          <div className="product-list-detail">
              <h5 className="p-mb-2">{item.name}</h5>
              <i className="pi pi-tag product-category-icon"></i>
              <span className="product-category">{item.category}</span>
          </div>
          <div className="product-list-action">
              <h6 className="p-mb-2">${item.price}</h6>
              <span className={`product-badge status-${item.inventoryStatus}`}>{item.inventoryStatus}</span>
          </div>
      </div>
  );
}
export default function App(){
  const {isLoaded,loadError} = useLoadScript({
    //ENTER YOUR GOOGLE API KEY HERE
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAP_API_KEY,
    libraries
  });
 
  const [center , setCenter] = useState({lat:39.933365, lng: 32.859741});
  const [markers,setMarkers]= React.useState([]);
  const [counties, setCounties]= React.useState([]);
  const [selectedCity, setSelectedCity] = useState(null);
  const [selectedCounty, setSelectedCounty] = useState(null);
  const [cities, setCities] = useState(null);
  const cityService =  new CitiesService();
  useEffect(() => {
     setCities(cityService.getCitiesAll());
  }, []);
   const nameCity = [];

  if(loadError)
    return "error couldnt load the map";
  if(!isLoaded)
    return "loading maps";

  cities.cities.forEach(city => {
    nameCity.push({name : city.city});
  })
  
  return <div>
    <h1>Turkish Cities </h1>

  <GoogleMap 
    mapContainerStyle={mapContainerStyle} 
    zoom={11} 
    center={center}
    options={options}
    onClick={(event)=>{
      setMarkers(current => [...current, { 
        lat: event.latLng.lat(),
        lng: event.latLng.lng(),
        time: new Date(),
      }])
    }}>
    {markers.map(marker=> <Marker key={marker.time.toISOString()} 
    position={{lat: marker.lat,lng: marker.lng}}></Marker>)}
    
    <Marker position={{lat: center.lat,lng: center.lng}}></Marker>

  </GoogleMap>
  
      <div className="datatable-selection1-demo">
            <div className="card">
                <DataTable 
                 value={cities.cities} 
                 selectionMode="single" 
                 selection={selectedCity}
                  onSelectionChange={e => {
                    setSelectedCity(e.value);
                    var temp= [];
                    temp = cities.cities.filter(city => city.city==e.value.city)
                    temp = temp.map(e=> {return {county :e.county,centerLat:e.centerLat, centerLon:e.centerLon }});
                    setCounties( [...temp]);
                    }}
                     dataKey="city">
                    <Column field="city" header="City"></Column>
                </DataTable>
              </div>
      <div className="datatable-selection2-demo">
            <div className="card">
                <DataTable 
                 value={counties}
                 selectionMode="single"
                 selection = {selectedCounty}
                 onSelectionChange={e => {
                   setSelectedCounty(e.value);
                   setCenter({lat:e.value.centerLat,lng:e.value.centerLon});
                }}
                 dataKey="county">
                    <Column field="county" header="County" className="coltable"></Column>
                </DataTable>
              </div>
      </div>
      </div>
  </div>
}