--
-- PostgreSQL database dump
--

-- Dumped from database version 9.5.3
-- Dumped by pg_dump version 9.5.3

SET statement_timeout = 0;
SET lock_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET search_path = public, pg_catalog;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: area; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE area (
    id integer NOT NULL,
    zipcode integer,
    name character varying,
    pictures json,
    info json
);


ALTER TABLE area OWNER TO postgres;

--
-- Name: area_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE area_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE area_id_seq OWNER TO postgres;

--
-- Name: area_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE area_id_seq OWNED BY area.id;


--
-- Name: category; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE category (
    id integer NOT NULL,
    name character varying,
    picture json,
    info json
);


ALTER TABLE category OWNER TO postgres;

--
-- Name: catagory_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE catagory_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE catagory_id_seq OWNER TO postgres;

--
-- Name: catagory_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE catagory_id_seq OWNED BY category.id;


--
-- Name: company; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE company (
    id integer NOT NULL,
    name character varying,
    gps point,
    phone text,
    address text,
    owner_id integer,
    area_id integer,
    category_id integer,
    picutres json,
    hours json,
    info json,
    active boolean,
    expires timestamp with time zone,
    users integer[]
);


ALTER TABLE company OWNER TO postgres;

--
-- Name: company_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE company_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE company_id_seq OWNER TO postgres;

--
-- Name: company_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE company_id_seq OWNED BY company.id;


--
-- Name: company_routes; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE company_routes (
    id integer NOT NULL,
    company_id integer,
    name character varying,
    gps point[],
    distance character varying,
    "time" character varying,
    info json,
    pictures json
);


ALTER TABLE company_routes OWNER TO postgres;

--
-- Name: routes; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE routes (
    id integer NOT NULL,
    name character varying,
    category_id integer,
    "unique" boolean,
    gps point[],
    pictures json,
    info json,
    user_id integer,
    active boolean,
    area_id integer
);


ALTER TABLE routes OWNER TO postgres;

--
-- Name: routes_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE routes_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE routes_id_seq OWNER TO postgres;

--
-- Name: routes_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE routes_id_seq OWNED BY company_routes.id;


--
-- Name: routes_id_seq1; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE routes_id_seq1
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE routes_id_seq1 OWNER TO postgres;

--
-- Name: routes_id_seq1; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE routes_id_seq1 OWNED BY routes.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE users (
    id integer NOT NULL,
    resettoken character varying,
    tokenexpired timestamp with time zone,
    name character varying,
    email character varying(80),
    username character varying(60),
    hash character varying,
    admin boolean,
    phone text,
    address text,
    moderator boolean,
    active boolean,
    companies integer[]
);


ALTER TABLE users OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE users_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE users_id_seq OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE users_id_seq OWNED BY users.id;


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY area ALTER COLUMN id SET DEFAULT nextval('area_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY category ALTER COLUMN id SET DEFAULT nextval('catagory_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY company ALTER COLUMN id SET DEFAULT nextval('company_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY company_routes ALTER COLUMN id SET DEFAULT nextval('routes_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY routes ALTER COLUMN id SET DEFAULT nextval('routes_id_seq1'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY users ALTER COLUMN id SET DEFAULT nextval('users_id_seq'::regclass);


--
-- Data for Name: area; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY area (id, zipcode, name, pictures, info) FROM stdin;
\.


--
-- Name: area_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('area_id_seq', 1, false);


--
-- Name: catagory_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('catagory_id_seq', 1, false);


--
-- Data for Name: category; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY category (id, name, picture, info) FROM stdin;
\.


--
-- Data for Name: company; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY company (id, name, gps, phone, address, owner_id, area_id, category_id, picutres, hours, info, active, expires, users) FROM stdin;
\.


--
-- Name: company_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('company_id_seq', 1, false);


--
-- Data for Name: company_routes; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY company_routes (id, company_id, name, gps, distance, "time", info, pictures) FROM stdin;
\.


--
-- Data for Name: routes; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY routes (id, name, category_id, "unique", gps, pictures, info, user_id, active, area_id) FROM stdin;
\.


--
-- Name: routes_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('routes_id_seq', 1, false);


--
-- Name: routes_id_seq1; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('routes_id_seq1', 1, false);


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY users (id, resettoken, tokenexpired, name, email, username, hash, admin, phone, address, moderator, active, companies) FROM stdin;
\.


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('users_id_seq', 1, true);


--
-- Name: id_area_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY area
    ADD CONSTRAINT id_area_pkey PRIMARY KEY (id);


--
-- Name: id_category_pkay; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY category
    ADD CONSTRAINT id_category_pkay PRIMARY KEY (id);


--
-- Name: id_company_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY company
    ADD CONSTRAINT id_company_pkey PRIMARY KEY (id);


--
-- Name: id_companyroutes_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY company_routes
    ADD CONSTRAINT id_companyroutes_pkey PRIMARY KEY (id);


--
-- Name: id_routes_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY routes
    ADD CONSTRAINT id_routes_pkey PRIMARY KEY (id);


--
-- Name: id_users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY users
    ADD CONSTRAINT id_users_pkey PRIMARY KEY (id);


--
-- Name: areaid_company_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY company
    ADD CONSTRAINT areaid_company_fkey FOREIGN KEY (area_id) REFERENCES area(id);


--
-- Name: areaid_routes_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY routes
    ADD CONSTRAINT areaid_routes_fkey FOREIGN KEY (area_id) REFERENCES area(id);


--
-- Name: categoryid_company_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY company
    ADD CONSTRAINT categoryid_company_fkey FOREIGN KEY (category_id) REFERENCES category(id);


--
-- Name: categoryid_routes_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY routes
    ADD CONSTRAINT categoryid_routes_fkey FOREIGN KEY (category_id) REFERENCES category(id);


--
-- Name: companyid_companyroutes_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY company_routes
    ADD CONSTRAINT companyid_companyroutes_fkey FOREIGN KEY (company_id) REFERENCES company(id);


--
-- Name: ownerid_company_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY company
    ADD CONSTRAINT ownerid_company_fkey FOREIGN KEY (owner_id) REFERENCES users(id);


--
-- Name: userid_routes_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY routes
    ADD CONSTRAINT userid_routes_fkey FOREIGN KEY (user_id) REFERENCES users(id);


--
-- Name: public; Type: ACL; Schema: -; Owner: postgres
--

REVOKE ALL ON SCHEMA public FROM PUBLIC;
REVOKE ALL ON SCHEMA public FROM postgres;
GRANT ALL ON SCHEMA public TO postgres;
GRANT ALL ON SCHEMA public TO PUBLIC;


--
-- PostgreSQL database dump complete
--

