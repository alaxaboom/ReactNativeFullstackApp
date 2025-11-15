import { RootState } from '../../../shared/api/store';
import { locationApi } from './locationApi';

export const selectAllLocations = (state: RootState) => 
  locationApi.endpoints.getAllLocations.select()(state)?.data ?? [];

export const selectLocationById = (id: number) => (state: RootState) =>
  locationApi.endpoints.getLocationById.select(id)(state)?.data;

