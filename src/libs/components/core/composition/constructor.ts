export type Constructor<T> = new(...args: any[]) => T;

export type AbstractConstructor<T> = Function & { prototype: T };
