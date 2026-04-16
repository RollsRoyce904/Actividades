type Actividad = {
  id: string
  titulo: string
  date: Date
  descripcion: string
  categoria: string
  isCancelado: boolean
  ciudad: string
  lugar: string
  latitud: number
  longitud: number
}


type LocationIQSuggestion = {
    place_id: string
    osm_id: string
    osm_type: string
    licence: string
    lat: string
    lon: string
    boundingbox: string[]
    class: string
    type: string
    display_name: string
    display_place: string
    display_address: string
    address: LocationIQAddress
}

type LocationIQAddress = {
    name: string
    house_number: string
    road: string
    suburb?: string
    town?: string
    village?: string
    city?: string
    county: string
    state: string
    postcode: string
    country: string
    country_code: string
    neighbourhood?: string
}