import React, { useState, useEffect } from 'react';
import './App.css';
import Banner from './components/Banner';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
function App() {
  const [planets, setPlanets] = useState([]);
  const [nextPage, setNextPage] = useState(null);
  const [prevPage, setPrevPage] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPlanets('https://swapi.dev/api/planets/');
  }, []);

  const fetchPlanets = async (url) => {
    try {
      const response = await fetch(url);
      const data = await response.json();
      const promises = data.results.map(async (planet) => {
        const residents = await Promise.all(
          planet.residents.map(async (residentUrl) => {
            const residentResponse = await fetch(residentUrl);
            const residentData = await residentResponse.json();
            return residentData;
          })
        );
        return { ...planet, residents };
      });
      const updatedPlanets = await Promise.all(promises);
      setPlanets(updatedPlanets);
      setNextPage(data.next);
      setPrevPage(data.previous);
      setLoading(false);
    } catch (error) {
      alert('Page not Load. Internal server Error:500')
      console.error('Error fetching planets:', error);
      setLoading(false);
      
    }
  };

  const fetchNextPage = () => {
    if (nextPage) {
      fetchPlanets(nextPage);
    }
  };

  const fetchPrevPage = () => {
    if (prevPage) {
      fetchPlanets(prevPage);
    }
  };
  return (
    <>
      <NavBar />
      <Banner />
      <h1>Star Wars Planets Directory</h1>
      <div className="container mt-5">

        {loading ? (
          <div className="text-center">
            <div className="spinner-border text-warning" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : (
          <>
            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 g-4">
              {planets.map((planet, index) => (
                <div key={index} className="col">
                  <div className="card h-100 d-flex flex-column" id="card">
                    <div className="card-body">
                      <h5 className="card-title" >{planet.name}</h5>
                      <table className="table table-bordered">
                        <tbody>
                          <tr>
                            <td>Climate:</td>
                            <td>{planet.climate}</td>
                          </tr>
                          <tr>
                            <td>Population:</td>
                            <td>{planet.population}</td>
                          </tr>
                          <tr>
                            <td>Terrain:</td>
                            <td>{planet.terrain}</td>
                          </tr>
                        </tbody>
                      </table>
                      {planet.residents.length > 0 && (
                        <>
                          <div className="card">
                            <div className="card-body">
                              <h6 className="card-title">Residents:</h6>
                              {planet.residents.map((resident, index) => (
                                <div key={index}>
                                  <p className="m-0">Name: {resident.name}</p>
                                  <p className="m-0">Height: {resident.height}</p>
                                  <p className="m-0">Mass: {resident.mass}</p>
                                  <p className="m-0">Gender: {resident.gender}</p>
                                  {index !== planet.residents.length - 1 && <hr className="my-1" />} {}
                                </div>
                              ))}
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 d-flex justify-content-center">
              <button onClick={fetchPrevPage} disabled={!prevPage} className="star-wars-button">
                Previous Page
              </button>
              <button onClick={fetchNextPage} disabled={!nextPage} className="star-wars-button">
                Next Page
              </button>
            </div>
          </>
        )}
      </div>

      <Footer/>
    </>
  );
}

export default App;
