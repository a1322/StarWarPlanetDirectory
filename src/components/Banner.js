import React from 'react'
import banner from '../banner.jpg'
export default function Banner() {
    return (
        <React.Fragment>
            <div id="carouselExampleFade" className="carousel slide carousel-fade">
                <div className="carousel-inner">
                    <div className="carousel-item active">
                        <img src={banner} className="d-block w-100" alt="banner" />
                    </div>

                </div>

            </div>
        </React.Fragment>
    )
}
