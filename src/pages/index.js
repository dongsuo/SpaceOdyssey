import React, { Component } from 'react';
import windLevel, { windDir } from "../map";
import "./index.scss";


// const IMAGE_API = `https://api.unsplash.com/photos/random&client_id=e6f2095f8250387649ad01af8ef8fb94b19635ed602da9b67aa961810130d1aa&collections=1111575`;

const MARS_WEATHER_API = `https://mars.nasa.gov/rss/api/?feed=weather&category=insight&feedtype=json&ver=1.0`;

// function getNASAImage(that) {
//   fetch(IMAGE_API).then(resp => {
//     if (resp.statusCode !== 200) {
//       that.setState({
//         imageUrl:
//           "https://wpimg.wallstcn.com/c04f1938-9ec4-423f-9ac5-aa154d0bfe0e.jpg",
//         imageDesc: "Looking Back on a Golden Opportunity"
//       });
//     } else {
//       that.setState({
//         imageUrl: resp.data.urls.small,
//         imageDesc: resp.data.description || resp.data.alt_description
//       });
//     }
//   });
// }

function windLevelCal(speed) {
  let levelResult;
  windLevel.forEach(level => {
    if (speed >= level.speed[0] && speed <= level.speed[1]) {
      levelResult = level.level;
    }
  });
  return levelResult;
}

export default class Index extends Component {

  constructor() {
    super();
    this.state = {
      today: undefined,
      todayWeather: {
        sol: 0
      },
      imageUrl: undefined
    };
  }

  componentWillMount() {

    // getNASAImage(this);

    fetch(MARS_WEATHER_API).then(resp => {
      return resp.json()
    }).then(resp => {
      console.log(resp)
      const sol = resp.sol_keys.slice(-1)[0];
      const month = new Date(resp[sol].First_UTC).getMonth() + 1;
      const date = new Date(
        +new Date(resp[sol].First_UTC) + 8 * 3600 * 1000
      ).getDate();

      this.setState({
        today: month + "月" + date + "日"
      });
      this.setState({
        todayWeather: {
          sol: sol,
          data: resp[sol]
        }
      });
    });
  }

  render() {
    return (
      <div className='page'>
        <div className='section temperature-section'>
          {this.state.todayWeather.data && (
            <React.Fragment>
              <div className='temperature-num'>
                <div className='main-num'>
                  {this.state.todayWeather.data.AT.av.toFixed(1)}℃
                  <span className='sm-text'>平均</span>
                </div>
                <div className='second-num'>
                  {this.state.todayWeather.data.AT.mx.toFixed(1)}℃ ~{" "}
                  {this.state.todayWeather.data.AT.mn.toFixed(1)}℃
                </div>
                <div className='second-num'>
                  {
                    windDir[
                    this.state.todayWeather.data.WD.most_common.compass_point
                    ]
                  }
                  风 {windLevelCal(this.state.todayWeather.data.HWS.mn)}-
                  {windLevelCal(this.state.todayWeather.data.HWS.mx)}级
                </div>
              </div>
              <div className='location-wrapper'>
                <div className='location-date'>
                  {this.state.today + " "}
                  {/* {` SOL ${this.state.todayWeather.sol}`} */}
                </div>
                <div className='location'>埃律西昂平原·火星</div>
                <div className='location'>太阳系·猎户支臂·银河系</div>
              </div>
            </React.Fragment>
          )}
        </div>
        {/* <Image className='image' mode='aspectFill' src={this.state.imageUrl}></Image> */}
        {/* <div style={{'text-transform': 'capitalize', 'font-size': '16px', 'text-align': 'center'}}>{(this.state.imageDesc || 'Photo ') +' ' } By NASA</div> */}

        <div className='section'>
          {this.state.todayWeather.data &&
            this.state.todayWeather.data.WD.most_common && (
              <React.Fragment>
                <div>风速</div>
                <div className='wd-section'>
                  <div className='second-num'>
                    {this.state.todayWeather.data.HWS.mx}m/s<span>最高</span>
                  </div>
                  <div className='second-num'>
                    {this.state.todayWeather.data.HWS.mn}m/s<span>最低</span>
                  </div>
                  <div className='second-num'>
                    {this.state.todayWeather.data.HWS.av}m/s<span>平均</span>
                  </div>
                </div>
              </React.Fragment>
            )}
        </div>

        <div className='section'>
          <div>气压</div>
          {this.state.todayWeather.data && (
            <div className='wd-section'>
              <div className='second-num'>
                {this.state.todayWeather.data.PRE.mx}Pa<span>最高</span>
              </div>
              <div className='second-num'>
                {this.state.todayWeather.data.PRE.mn}Pa<span>最低</span>
              </div>
              <div className='second-num'>
                {this.state.todayWeather.data.PRE.av}Pa<span>平均</span>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}
