PGDMP     3                	    y         
   SeeCourses    11.12    12.6 9    ?           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            ?           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            ?           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            ?           1262    17443 
   SeeCourses    DATABASE     j   CREATE DATABASE "SeeCourses" WITH TEMPLATE = template0 ENCODING = 'UTF8' LC_COLLATE = 'C' LC_CTYPE = 'C';
    DROP DATABASE "SeeCourses";
                postgres    false            ?            1259    17444    administrador    TABLE     ?   CREATE TABLE public.administrador (
    id integer NOT NULL,
    fecha_alta date NOT NULL,
    pass character varying(100) NOT NULL,
    pass_extremo character varying(100) NOT NULL,
    activo boolean DEFAULT false,
    usuario character varying(100)
);
 !   DROP TABLE public.administrador;
       public            postgres    false            ?            1259    17448    administrador_id_seq    SEQUENCE     ?   CREATE SEQUENCE public.administrador_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 +   DROP SEQUENCE public.administrador_id_seq;
       public          postgres    false    196            ?           0    0    administrador_id_seq    SEQUENCE OWNED BY     M   ALTER SEQUENCE public.administrador_id_seq OWNED BY public.administrador.id;
          public          postgres    false    197            ?            1259    17450    entidad    TABLE     Q  CREATE TABLE public.entidad (
    id integer NOT NULL,
    id_usuario integer NOT NULL,
    id_provincia integer NOT NULL,
    id_pais integer NOT NULL,
    descripcion character varying(150),
    web character varying(100) NOT NULL,
    email character varying(100) NOT NULL,
    verificado boolean DEFAULT false,
    nombre character varying(100) NOT NULL,
    direccion character varying(100) NOT NULL,
    telefono character varying(100) NOT NULL,
    imagen character varying(100),
    cuit character varying(15),
    ciudad character varying(100),
    director character varying(100)
);
    DROP TABLE public.entidad;
       public            postgres    false            ?            1259    17457    entidad_id_seq    SEQUENCE     ?   CREATE SEQUENCE public.entidad_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 %   DROP SEQUENCE public.entidad_id_seq;
       public          postgres    false    198            ?           0    0    entidad_id_seq    SEQUENCE OWNED BY     A   ALTER SEQUENCE public.entidad_id_seq OWNED BY public.entidad.id;
          public          postgres    false    199            ?            1259    17459    estado    TABLE     i   CREATE TABLE public.estado (
    id integer NOT NULL,
    descripcion character varying(100) NOT NULL
);
    DROP TABLE public.estado;
       public            postgres    false            ?            1259    17462    estado_id_seq    SEQUENCE     ?   CREATE SEQUENCE public.estado_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 $   DROP SEQUENCE public.estado_id_seq;
       public          postgres    false    200            ?           0    0    estado_id_seq    SEQUENCE OWNED BY     ?   ALTER SEQUENCE public.estado_id_seq OWNED BY public.estado.id;
          public          postgres    false    201            ?            1259    17464 
   itinerario    TABLE     j  CREATE TABLE public.itinerario (
    id integer NOT NULL,
    id_entidad integer NOT NULL,
    nombre character varying(100) NOT NULL,
    titulo character varying(100),
    descripcion character varying(250) NOT NULL,
    observacion character varying(250),
    fecha_itinerario date NOT NULL,
    hora_itinerario time without time zone NOT NULL,
    fecha_alta date NOT NULL,
    imagen character varying(256),
    link character varying(100),
    instructor character varying(100),
    viewed integer,
    validado boolean DEFAULT false,
    finalizado boolean DEFAULT false,
    rechazado boolean DEFAULT false
);
    DROP TABLE public.itinerario;
       public            postgres    false            ?            1259    17470    itinerario_id_seq    SEQUENCE     ?   CREATE SEQUENCE public.itinerario_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 (   DROP SEQUENCE public.itinerario_id_seq;
       public          postgres    false    202            ?           0    0    itinerario_id_seq    SEQUENCE OWNED BY     G   ALTER SEQUENCE public.itinerario_id_seq OWNED BY public.itinerario.id;
          public          postgres    false    203            ?            1259    17472    log    TABLE       CREATE TABLE public.log (
    id integer NOT NULL,
    descripcion character varying(100) NOT NULL,
    id_administrador integer NOT NULL,
    fecha_modificacion date NOT NULL,
    hora character varying(5) NOT NULL,
    maquina character varying(100),
    so character varying(100)
);
    DROP TABLE public.log;
       public            postgres    false            ?            1259    17475 
   log_id_seq    SEQUENCE     ?   CREATE SEQUENCE public.log_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 !   DROP SEQUENCE public.log_id_seq;
       public          postgres    false    204            ?           0    0 
   log_id_seq    SEQUENCE OWNED BY     9   ALTER SEQUENCE public.log_id_seq OWNED BY public.log.id;
          public          postgres    false    205            ?            1259    17477    notificacion    TABLE     ?  CREATE TABLE public.notificacion (
    id integer NOT NULL,
    id_entidad integer,
    id_estado integer NOT NULL,
    visto boolean DEFAULT false NOT NULL,
    es_admin boolean DEFAULT false NOT NULL,
    pendiente boolean DEFAULT false NOT NULL,
    descripcion character varying(100) NOT NULL,
    observacion character varying(200),
    fecha date NOT NULL,
    es_curso boolean DEFAULT false,
    id_curso integer DEFAULT 0 NOT NULL
);
     DROP TABLE public.notificacion;
       public            postgres    false            ?            1259    17483    notificacion_id_seq    SEQUENCE     ?   CREATE SEQUENCE public.notificacion_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 *   DROP SEQUENCE public.notificacion_id_seq;
       public          postgres    false    206            ?           0    0    notificacion_id_seq    SEQUENCE OWNED BY     K   ALTER SEQUENCE public.notificacion_id_seq OWNED BY public.notificacion.id;
          public          postgres    false    207            ?            1259    17485    pais    TABLE     g   CREATE TABLE public.pais (
    id integer NOT NULL,
    descripcion character varying(100) NOT NULL
);
    DROP TABLE public.pais;
       public            postgres    false            ?            1259    17488    pais_id_seq    SEQUENCE     ?   CREATE SEQUENCE public.pais_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 "   DROP SEQUENCE public.pais_id_seq;
       public          postgres    false    208            ?           0    0    pais_id_seq    SEQUENCE OWNED BY     ;   ALTER SEQUENCE public.pais_id_seq OWNED BY public.pais.id;
          public          postgres    false    209            ?            1259    17490 	   provincia    TABLE     ?   CREATE TABLE public.provincia (
    id integer NOT NULL,
    id_pais integer,
    descripcion character varying(100) NOT NULL
);
    DROP TABLE public.provincia;
       public            postgres    false            ?            1259    17493    provincia_id_seq    SEQUENCE     ?   CREATE SEQUENCE public.provincia_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 '   DROP SEQUENCE public.provincia_id_seq;
       public          postgres    false    210            ?           0    0    provincia_id_seq    SEQUENCE OWNED BY     E   ALTER SEQUENCE public.provincia_id_seq OWNED BY public.provincia.id;
          public          postgres    false    211            ?            1259    17495    usuario    TABLE     ?   CREATE TABLE public.usuario (
    id integer NOT NULL,
    usuario character varying(100) NOT NULL,
    pass character varying(100) NOT NULL,
    fecha_alta date NOT NULL,
    activo boolean DEFAULT false
);
    DROP TABLE public.usuario;
       public            postgres    false            ?            1259    17499    usuario_id_seq    SEQUENCE     ?   CREATE SEQUENCE public.usuario_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 %   DROP SEQUENCE public.usuario_id_seq;
       public          postgres    false    212            ?           0    0    usuario_id_seq    SEQUENCE OWNED BY     A   ALTER SEQUENCE public.usuario_id_seq OWNED BY public.usuario.id;
          public          postgres    false    213            ?           2604    17501    administrador id    DEFAULT     t   ALTER TABLE ONLY public.administrador ALTER COLUMN id SET DEFAULT nextval('public.administrador_id_seq'::regclass);
 ?   ALTER TABLE public.administrador ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    197    196            ?           2604    17502 
   entidad id    DEFAULT     h   ALTER TABLE ONLY public.entidad ALTER COLUMN id SET DEFAULT nextval('public.entidad_id_seq'::regclass);
 9   ALTER TABLE public.entidad ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    199    198            ?           2604    17503 	   estado id    DEFAULT     f   ALTER TABLE ONLY public.estado ALTER COLUMN id SET DEFAULT nextval('public.estado_id_seq'::regclass);
 8   ALTER TABLE public.estado ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    201    200            ?           2604    17504    itinerario id    DEFAULT     n   ALTER TABLE ONLY public.itinerario ALTER COLUMN id SET DEFAULT nextval('public.itinerario_id_seq'::regclass);
 <   ALTER TABLE public.itinerario ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    203    202            ?           2604    17505    log id    DEFAULT     `   ALTER TABLE ONLY public.log ALTER COLUMN id SET DEFAULT nextval('public.log_id_seq'::regclass);
 5   ALTER TABLE public.log ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    205    204            ?           2604    17506    notificacion id    DEFAULT     r   ALTER TABLE ONLY public.notificacion ALTER COLUMN id SET DEFAULT nextval('public.notificacion_id_seq'::regclass);
 >   ALTER TABLE public.notificacion ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    207    206            ?           2604    17507    pais id    DEFAULT     b   ALTER TABLE ONLY public.pais ALTER COLUMN id SET DEFAULT nextval('public.pais_id_seq'::regclass);
 6   ALTER TABLE public.pais ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    209    208            ?           2604    17508    provincia id    DEFAULT     l   ALTER TABLE ONLY public.provincia ALTER COLUMN id SET DEFAULT nextval('public.provincia_id_seq'::regclass);
 ;   ALTER TABLE public.provincia ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    211    210            ?           2604    17509 
   usuario id    DEFAULT     h   ALTER TABLE ONLY public.usuario ALTER COLUMN id SET DEFAULT nextval('public.usuario_id_seq'::regclass);
 9   ALTER TABLE public.usuario ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    213    212                       2606    17511     administrador administrador_pkey 
   CONSTRAINT     ^   ALTER TABLE ONLY public.administrador
    ADD CONSTRAINT administrador_pkey PRIMARY KEY (id);
 J   ALTER TABLE ONLY public.administrador DROP CONSTRAINT administrador_pkey;
       public            postgres    false    196                       2606    17513    entidad entidad_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public.entidad
    ADD CONSTRAINT entidad_pkey PRIMARY KEY (id);
 >   ALTER TABLE ONLY public.entidad DROP CONSTRAINT entidad_pkey;
       public            postgres    false    198                       2606    17515    estado estado_pkey 
   CONSTRAINT     P   ALTER TABLE ONLY public.estado
    ADD CONSTRAINT estado_pkey PRIMARY KEY (id);
 <   ALTER TABLE ONLY public.estado DROP CONSTRAINT estado_pkey;
       public            postgres    false    200                       2606    17517    itinerario itinerario_pkey 
   CONSTRAINT     X   ALTER TABLE ONLY public.itinerario
    ADD CONSTRAINT itinerario_pkey PRIMARY KEY (id);
 D   ALTER TABLE ONLY public.itinerario DROP CONSTRAINT itinerario_pkey;
       public            postgres    false    202            	           2606    17519    log log_pkey 
   CONSTRAINT     J   ALTER TABLE ONLY public.log
    ADD CONSTRAINT log_pkey PRIMARY KEY (id);
 6   ALTER TABLE ONLY public.log DROP CONSTRAINT log_pkey;
       public            postgres    false    204                       2606    17521    notificacion notificacion_pkey 
   CONSTRAINT     \   ALTER TABLE ONLY public.notificacion
    ADD CONSTRAINT notificacion_pkey PRIMARY KEY (id);
 H   ALTER TABLE ONLY public.notificacion DROP CONSTRAINT notificacion_pkey;
       public            postgres    false    206                       2606    17523    pais pais_pkey 
   CONSTRAINT     L   ALTER TABLE ONLY public.pais
    ADD CONSTRAINT pais_pkey PRIMARY KEY (id);
 8   ALTER TABLE ONLY public.pais DROP CONSTRAINT pais_pkey;
       public            postgres    false    208                       2606    17525    provincia provincia_pkey 
   CONSTRAINT     V   ALTER TABLE ONLY public.provincia
    ADD CONSTRAINT provincia_pkey PRIMARY KEY (id);
 B   ALTER TABLE ONLY public.provincia DROP CONSTRAINT provincia_pkey;
       public            postgres    false    210                       2606    17527    usuario usuario_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_pkey PRIMARY KEY (id);
 >   ALTER TABLE ONLY public.usuario DROP CONSTRAINT usuario_pkey;
       public            postgres    false    212                       2606    17528    itinerario entidad_itinerario    FK CONSTRAINT     ?   ALTER TABLE ONLY public.itinerario
    ADD CONSTRAINT entidad_itinerario FOREIGN KEY (id_entidad) REFERENCES public.entidad(id);
 G   ALTER TABLE ONLY public.itinerario DROP CONSTRAINT entidad_itinerario;
       public          postgres    false    198    3075    202                       2606    17533 !   notificacion entidad_notificacion    FK CONSTRAINT     ?   ALTER TABLE ONLY public.notificacion
    ADD CONSTRAINT entidad_notificacion FOREIGN KEY (id_entidad) REFERENCES public.entidad(id);
 K   ALTER TABLE ONLY public.notificacion DROP CONSTRAINT entidad_notificacion;
       public          postgres    false    198    206    3075                       2606    17538     notificacion estado_notificacion    FK CONSTRAINT     ?   ALTER TABLE ONLY public.notificacion
    ADD CONSTRAINT estado_notificacion FOREIGN KEY (id_estado) REFERENCES public.estado(id);
 J   ALTER TABLE ONLY public.notificacion DROP CONSTRAINT estado_notificacion;
       public          postgres    false    200    206    3077                       2606    17543    log log_administracion    FK CONSTRAINT     ?   ALTER TABLE ONLY public.log
    ADD CONSTRAINT log_administracion FOREIGN KEY (id_administrador) REFERENCES public.administrador(id);
 @   ALTER TABLE ONLY public.log DROP CONSTRAINT log_administracion;
       public          postgres    false    3073    196    204                       2606    17548    entidad pais_entidad    FK CONSTRAINT     r   ALTER TABLE ONLY public.entidad
    ADD CONSTRAINT pais_entidad FOREIGN KEY (id_pais) REFERENCES public.pais(id);
 >   ALTER TABLE ONLY public.entidad DROP CONSTRAINT pais_entidad;
       public          postgres    false    3085    208    198                       2606    17553    provincia paisprovincia    FK CONSTRAINT     u   ALTER TABLE ONLY public.provincia
    ADD CONSTRAINT paisprovincia FOREIGN KEY (id_pais) REFERENCES public.pais(id);
 A   ALTER TABLE ONLY public.provincia DROP CONSTRAINT paisprovincia;
       public          postgres    false    208    3085    210                       2606    17558    entidad provincia_entidad    FK CONSTRAINT     ?   ALTER TABLE ONLY public.entidad
    ADD CONSTRAINT provincia_entidad FOREIGN KEY (id_provincia) REFERENCES public.provincia(id);
 C   ALTER TABLE ONLY public.entidad DROP CONSTRAINT provincia_entidad;
       public          postgres    false    3087    210    198                       2606    17563    entidad usuario_entidad    FK CONSTRAINT     {   ALTER TABLE ONLY public.entidad
    ADD CONSTRAINT usuario_entidad FOREIGN KEY (id_usuario) REFERENCES public.usuario(id);
 A   ALTER TABLE ONLY public.entidad DROP CONSTRAINT usuario_entidad;
       public          postgres    false    3089    212    198           