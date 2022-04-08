import SpeedSvg from '../assets/speed.svg';
import AccelerationSvg from '../assets/acceleration.svg';
import ForceSvg from '../assets/force.svg';
import GasolineSvg from '../assets/gasoline.svg';
import Energy from '../assets/energy.svg';
import Hybrid from '../assets/hybrid.svg';
import ExChangeSvg from '../assets/exchange.svg';
import PeopleSvg from '../assets/people.svg';
import CarSvg from '../assets/car.svg';

export function getAccessoryIcons(type: string) {
  switch (type) {
    case 'speed':
      return SpeedSvg;
    case 'acceleration':
      return AccelerationSvg;
    case 'turning_diameter':
      return ForceSvg;
    case 'gasoline_motor':
      return GasolineSvg;
    case 'electric_motor':
      return Energy;
    case 'hybrid_motor':
      return Hybrid;
    case 'exchange':
      return ExChangeSvg;
    case 'seats':
      return PeopleSvg;
    default:
      return CarSvg;
  }
}