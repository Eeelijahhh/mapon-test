import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

interface VehiclesList {
  data: {
    units: {
      unit_id: number;
      number: string;
    }[];
  };
}

interface RoutesList {
  data: {
    units: {
      unit_id: number;
      routes: {
        type: string;
        distance: number;
      }[];
    }[];
  };
}

interface RoutesListParams {
  from: string;
  till: string;
  unitId: number;
}

const API_KEY = process.env.MAPON_API_KEY;

export const maponApi = createApi({
  reducerPath: 'maponApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://mapon.com/api/v1/',
    validateStatus: (response, result) =>
      response.status === 200 && !result.error,
  }),
  endpoints: (builder) => ({
    getVehiclesList: builder.query<VehiclesList, string>({
      query: () => {
        return {
          url: 'unit/list.json',
          params: {
            key: API_KEY,
          },
        };
      },
    }),
    getRoutesListByUnitId: builder.query<RoutesList, RoutesListParams>({
      query: (params) => {
        const { from, till, unitId } = params;

        return {
          url: 'route/list.json',
          params: {
            key: API_KEY,
            from,
            till,
            unit_id: unitId,
            include: 'decoded_route',
          },
        };
      },
    }),
  }),
});

export const { useGetVehiclesListQuery, useLazyGetRoutesListByUnitIdQuery } =
  maponApi;
