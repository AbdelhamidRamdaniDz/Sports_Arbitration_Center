export interface EnergyService {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface EnergyStat {
  id: string;
  title: string;
  value: number;
  unit: string;
  icon: string;
}

export interface EnergyFeature {
  title: string;
  description: string;
  icon: string;
}

export interface EnergyAdvantage {
  title: string;
  description: string;
  icon: string;
}