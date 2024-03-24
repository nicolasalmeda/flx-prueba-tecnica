-- En este archivo deben estar tus ejercicios de consultas sql-- En este archivo deben estar tus ejercicios de consultas sql

-- Ejercicio 1

SELECT nombres 
FROM Empleados 
ORDER BY nombres DESC;

--Ejercicio 2

SELECT e.nombres, p.puesto, l.localidad
FROM Empleados e 
JOIN Puestos p ON e.puesto_id = p.id
JOIN Departamentos d ON e.departamento_id = d.id
JOIN Localidades l ON d.localidad_id = l.id
WHERE p.puesto = 'Soporte';

--Ejercicio 3

SELECT nombres 
FROM Empleados
WHERE nombres LIKE '%o';

--Ejercicio 4

SELECT e.nombres, e.sueldo, l.localidad
FROM Empleados e 
JOIN Departamentos d ON e.departamento_id = d.id
JOIN Localidades l ON d.localidad_id = l.id
WHERE l.localidad = 'Carlos Paz';

--Ejercicio 5

SELECT e.nombres, e.sueldo, l.localidad
FROM Empleados e 
JOIN Departamentos d ON e.departamento_id = d.id
JOIN Localidades l ON d.localidad_id = l.id
WHERE e.sueldo BETWEEN 10000 AND 13000;

--Ejercicio 6

SELECT d.denominacion
FROM Departamentos de
JOIN Empleados e ON d.id = e.departamento_id
GROUP BY d.id
HAVING COUNT (*) > 5;

--Ejercicio 7

SELECT e.nombres
FROM Empleados e 
JOIN Departamentos d ON e.departamento_id = d.id
JOIN Localidades l ON d.localidad_id = l.id
JOIN Puestos p ON e.puesto_id = p.id
WHERE l.Localidad = 'Córdoba' AND (p.puesto = 'Analista' OR p.puesto = 'Programador');

--Ejercicio 8

SELECT AVG(sueldo) AS sueldo_medio 
FROM Empleados; 

--Ejercicio 9

SELECT MAX(sueldo) AS max_sueldo
FROM Empleados
WHERE departamento_id = 10;

--Ejercicio 10

SELECT MIN(sueldo) AS min_sueldo
FROM Empleados e
JOIN Puestos p ON e.puesto_id = p.id
WHERE p.puestp = 'Soporte';

--Ejercicio 11

SELECT p.puesto, SUM(e.sueldo) AS total_sueldos
FROM Empleados ejercicios
JOIN Puestos p ON e.puesto_id = p.id
GROUP BY p.puesto;