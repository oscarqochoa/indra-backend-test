import { Column, CreateDateColumn, Entity, Index, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { StarshipMovie } from "./starship-movie.entity";
import { StarshipPilot } from "./starship-pilot.entity";

@Entity('starships')
export class Starship {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        type: 'varchar',
        length: 100,
    })
    @Index()
    nombre: string;

    @Column({
        type: 'varchar',
        length: 100,
    })
    @Index()
    modelo: string;

    @Column({
        type: 'varchar',
        length: 100,
    })
    fabricante: string;

    @Column({
        type: 'varchar',
        length: 100,
    })
    costo_en_creditos: string;

    @Column({
        type: 'varchar',
        length: 100,
    })
    longitud: string;

    @Column({
        type: 'varchar',
        length: 100,
    })
    velocidad_atmosferica_maxima: string;

    @Column({
        type: 'varchar',
        length: 100,
    })
    tripulacion: string;

    @Column({
        type: 'varchar',
        length: 100,
    })
    pasajeros: string;

    @Column({
        type: 'varchar',
        length: 100,
    })
    capacidad_carga: string;

    @Column({
        type: 'varchar',
        length: 100,
    })
    consumibles: string;

    @Column({
        type: 'varchar',
        length: 100,
    })
    calificación_hiperimpulsor: string;

    @Column({
        type: 'varchar',
        length: 100,
    })
    mglt: string;

    @Column({
        type: 'varchar',
        length: 100,
    })
    clase_nave_estelar: string;

    @CreateDateColumn({ type: "timestamp" })
    creado: Date;

    @UpdateDateColumn({ type: "timestamp" })
    editado: Date;

    @Column({
        type: 'varchar',
        length: 150
    })
    @Index()
    url: string;

    @OneToMany(() => StarshipPilot, (pilot: StarshipPilot) => pilot.starship)
    pilotos?: string[];

    @OneToMany(() => StarshipMovie, (movie: StarshipMovie) => movie.starship)
    peliculas?: string[];

}
