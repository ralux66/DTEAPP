import { Serializer } from "@angular/compiler";

export class DTE {
    public CompanyID: number;
    constructor() {
        this.CompanyID = 0;
    }
}
export module DTE {
    export class Param {
        public customerguid?: string;
        public status?: string;
    }
}

export class SubmiteDTE {
    public companynit: string;
    public passwordAPI: string;
    public userAPI: string;
    public status: string;
    constructor() {
        this.companynit = '';
        this.userAPI = '';
        this.passwordAPI = '';
        this.status = '';
    }
}

export module SubmiteDTE {
    export class Param {
        public companynit: string;
        public passwordAuth: string;
        public passwordFirmardocumento: string;
        public userAPI: string;
        public status: string;
        public NumeroControl: string;
        constructor() {
            this.companynit = '';
            this.userAPI = '';
            this.passwordAuth = '';
            this.passwordFirmardocumento = '';
            this.status = '';
            this.NumeroControl = '';
        }
    }
}




export class BillDTE {
    public customerguid: string;
    //add
    public NumeroControl: string; //"DTE-01-02075433-000000000000001"
    public CodigoGeneracion: string; //"4B02E281-8EA3-48D6-7704-0E0014D42229"
    //end
    public RecLoc: string;
    public SegSeqNbr: number;
    public NbrOfPax: number;
    public ArcIata: string;
    public FirstName: string;
    public LastName: string;
    public Email: string;
    public BookingDate: Date;
    public FlightDate: Date;
    public SegmentOrigin: string;
    public SegmentDest: string;
    public Base: number;
    public CurrencyBase: string;
    public SV: number;
    public Status: string;

    constructor() {
        this.customerguid = '';
        this.NumeroControl = '';
        this.CodigoGeneracion = '';
        this.RecLoc = '';
        this.SegSeqNbr = 0;
        this.NbrOfPax = 0;
        this.ArcIata = '';
        this.FirstName = '';
        this.LastName = '';
        this.Email = '';
        this.BookingDate = new Date();
        this.FlightDate = new Date();
        this.SegmentOrigin = '';
        this.SegmentDest = '';
        this.Base = 0;
        this.CurrencyBase = '';
        this.SV = 0;
        this.Status = '';
    }

}

export module BillDTE {
    export class Param {
        public customerguid?: string;
        public NumeroControl?: string;
    }
}

export class User {
    public companyguid: string;
    public userguid: string;
    public nombre: string;
    public codigo: string;
    public descripcion: string;
    public rolSuperior: string;
    public nivel: string;
    public activo: string;
    public permisos: string;
    public token: string;
    public tokenType: string;
    public roles: string;
    public password: string;

    constructor(
        companyguid: string = "",
        userguid: string = "",
        nombre: string = "",
        codigo: string = "",
        descripcion: string = "",
        rolSuperior: string = "",
        nivel: string = "",
        activo: string = "",
        permisos: string = "",
        token: string = "",
        tokenType: string = "",
        roles: string = "",
        password: string = ""
    ) {
        this.companyguid = companyguid;
        this.userguid = userguid;
        this.nombre = nombre;
        this.codigo = codigo;
        this.descripcion = descripcion;
        this.rolSuperior = rolSuperior;
        this.nivel = nivel;
        this.activo = activo;
        this.permisos = permisos;
        this.token = token;
        this.tokenType = tokenType;
        this.roles = roles;
        this.password = password;
    }
}


export module User {
    export class Param {
        public username?: string;
        public password?: string;
    }
}

export class Customer {
    public customerguid: string;
    public nombre: string;
    public nombreComercial: string;
    public nit: string;
    public nrc: string;
    public tipoEstablecimiento: string;
    public tipoMoneda: string;
    public telefono: string;
    public correo: string;
    public codActividad: string;
    public descActividad: string;
    public departamento: string;
    public municipio: string;
    public complemento: string;
    public codEstableMH: string;
    public codEstable: string;
    public codPuntoVentaMH: string;
    public codPuntoVenta: string;

    constructor(
        customerguid: string,
        nombre: string,
        nombreComercial: string,
        nit: string,
        nrc: string,
        tipoEstablecimiento: string,
        tipoMoneda: string,
        telefono: string,
        correo: string,
        codActividad: string,
        descActividad: string,
        departamento: string,
        municipio: string,
        complemento: string,
        codEstableMH: string,
        codEstable: string,
        codPuntoVentaMH: string,
        codPuntoVenta: string
    ) {
        this.customerguid = customerguid;
        this.nombre = nombre;
        this.nombreComercial = nombreComercial;
        this.nit = nit;
        this.nrc = nrc;
        this.tipoEstablecimiento = tipoEstablecimiento;
        this.tipoMoneda = tipoMoneda;
        this.telefono = telefono;
        this.correo = correo;
        this.codActividad = codActividad;
        this.descActividad = descActividad;
        this.departamento = departamento;
        this.municipio = municipio;
        this.complemento = complemento;
        this.codEstableMH = codEstableMH;
        this.codEstable = codEstable;
        this.codPuntoVentaMH = codPuntoVentaMH;
        this.codPuntoVenta = codPuntoVenta;
    }
}

export class Logs {
    public companyguid: string;
    public fecha_hora: string;
    public nivel: string;
    public origen: string;
    public mensaje: string;
    public datos: string;
    constructor() {
        this.companyguid = '';
        this.fecha_hora = '';
        this.nivel = '';
        this.origen = '';
        this.mensaje = '';
        this.datos = '';

    }
}

export module Logs {
    export class Param {
        public companyguid?: string;        
    }
}
