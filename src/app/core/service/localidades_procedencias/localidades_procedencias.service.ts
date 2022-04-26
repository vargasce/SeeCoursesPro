import { Injectable } from "@angular/core";
import { HttpClient, HttpHandler, HttpHeaders } from "@angular/common/http";
import { environment } from '../../../../environments/environment';
import { ProvinciasModel } from "../../models/provincias/provincias.model";
import { Localidad_ProcedenciaModel } from "../../models/localidad_procedencia/localidad_procedencia.model";

@Injectable({
    providedIn: 'root'
})
export class Localidades_procedenciasService {

    private controller: string = 'localidad';

    constructor(
        private http: HttpClient
    ) {

    }

    getLocalidadesByIdProvincia(id: number) {
        let headers = { headers: environment.headers };
        let send = {
            'action': "list-localidadesById",
            'data': {
                'id_provincia': id
            }
        }
        return this.http.post<any>(environment.apiURL + this.controller, send, headers);
    }


    getLocalidadById(id: number) {
        let headers = { headers: environment.headers };
        let send = {
            'action': "get-provinciaById",
            'data': {
                'id': id
            }
        }
        return this.http.post<any>(environment.apiURL + this.controller, send, headers);
    }

    guardarLocalidad(localidad: Localidad_ProcedenciaModel) {
        let headers = { headers: environment.headers };
        let send = {
            'action': "add-localidad",
            'data': {
                'localidad': localidad.localidad,
                'cod_postal': localidad.cod_postal,
                'id_provincia': localidad.id_provincia,
            }
        }
        return this.http.post<any>(environment.apiURL + this.controller, send, headers);
    }

    editarLocalidad(localidad: Localidad_ProcedenciaModel) {
        let headers = { headers: environment.headers };
        let send = {
            'action': "get-provinciaById",
            'data': {
                'localidad': localidad
            }
        }
        return this.http.post<any>(environment.apiURL + this.controller, send, headers);
    }

    getLocalidades(Skip: number, Take: number) {
        let headers = { headers: environment.headers };
        let send = {
            'action': "list-page-localidades",
            'pag': { Skip, Take }
        }
        return this.http.post<any>(environment.apiURL + this.controller, send, headers);
    }

    eliminarLocalidad(id: number) {
        let headers = { headers: environment.headers };
        let send = {
            'action': "delete-localidad",
            'data': {
                'id': id
            }
        }
        return this.http.post<any>(environment.apiURL + this.controller, send, headers);
    }


}
