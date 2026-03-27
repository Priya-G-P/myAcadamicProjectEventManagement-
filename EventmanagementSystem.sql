create table signup(
   [uid] int primary key identity(101,1),
   [fullname] varchar(50),
   username varchar(50) unique not null ,
   Email varchar(50)unique not null,
   [password] varchar(50)unique not null,
   phoneNumber varchar(50) unique not null,
   role int default 0 not null,
);

insert into signup values('Priya','Priya G P','priya@gmail.com','Priya@1234','9986146509',1)

drop table signup
select * from signup

select 1 from signin where Email='priya@gmail.com' and password='Priya@1234';

create table ServicesCategory  (
   ServicesCategoryid int primary key identity(1,1),
   ServicesCategoryname varchar(50) not null,
);

create table ServicesTable(
   Servicesid int primary key identity(1,1),
   ServicesCategoryid int not null,
   imageurl TEXT not null,
   ServicesName varchar(50) not null,


   CONSTRAINT FK_Services_Category
   FOREIGN KEY (ServicesCategoryId)
   REFERENCES ServicesCategory(ServicesCategoryId)
)

insert into ServicesCategory (ServicesCategoryname)
values('wedding'),
('privateParties'),
('FestivalEvent');


select *from ServicesCategory
drop table ServicesCategory

insert into ServicesTable (ServicesCategoryid,imageurl,ServicesName)
values(1,'Services1.jpg','houseBoat wedding karnataka'),
(1,'Services6.jpg','stage Decoration karnataka'),
(1,'Services2.jpg','wedding car Decor '),
(1,'Services3.jpg','wedding dance karnataka '),
(1,'Services4.jpg','live streaming services'),
(1,'Services5.jpg','Bridal and groom makeup'),
(2,'PrivateParties1.jpeg','Thems Parties'),
(2,'PrivateParties2.jpeg','Get together'),
(2,'PrivateParties3.jpeg','alumni meet'),
(2,'PrivateParties5.jpeg','anniversary parties'),
(2,'PrivateParties4.jpeg','Brithday parties'),

(3,'Dasara.jpg','Dasara/vijayadashami'),
(3,'Holi.jpg','Holi'),
(3,'Ganesha.jpg','Ganesh Chaturthi'),
(3,'chritmas.jpg','chritmas');
--(3,'Ramadan.jpg','Ramadan')

ALTER TABLE ServicesTable
ADD imageurl_new VARBINARY(MAX);


select *from ServicesTable

drop table ServicesTable

DELETE FROM ServicesTable WHERE ServicesCategoryid = 1;

DELETE FROM ServicesCategory WHERE Servicescategoryid = 1;


CREATE TABLE ServiceManagement
(
   ServiceManagementid INT PRIMARY KEY IDENTITY(1,1),
   Servicesid INT NOT NULL,
   imageurl TEXT NOT NULL,

   CONSTRAINT FK_ServiceManagement_Services
   FOREIGN KEY (Servicesid)
   REFERENCES ServicesTable(Servicesid)
);
select * from booking
INSERT INTO ServiceManagement (Servicesid, image)
SELECT 1, BulkColumn
FROM OPENROWSET(
    BULK 'C:\Users\HP\OneDrive\Pictures\Saved Pictures\1(2).jpg',
    SINGLE_BLOB
) AS img;


drop table ServiceManagement

select *from ServiceManagement

ALTER TABLE ServiceManagement
DROP COLUMN imageurl;

ALTER TABLE ServiceManagement
ADD image VARBINARY(MAX);



create table Booking(
	BookingId int primary key identity(1,1),

	uid int not null,   

	fullName varchar(50) not null,
	phoneNumber varchar(13) not null,
	address varchar(30) not null,
	date date not null,
	numberOfGuest int not null,
	numberOfDays int not null,
	functionTypes varchar(30) not null,

	constraint FK_Booking_User 
	foreign key (uid) references signin(uid)
);
 
 drop table Booking

 insert into Booking (uid,fullName,phoneNumber,address,date,numberOfGuest,numberOfDays,functionTypes)
 values (101,'Priya G P','9986146509','Davangere','2026-03-04',200,2,'wedding');


 ALTER TABLE Booking DROP CONSTRAINT FK_Booking_User;

ALTER TABLE Booking
ADD CONSTRAINT FK_Booking_User
FOREIGN KEY (uid) REFERENCES signup(uid);



 select *from Booking

 ALTER TABLE Booking
ADD status VARCHAR(20) DEFAULT 'Pending';

ALTER TABLE Booking
ADD image VARBINARY(MAX);

ALTER TABLE Booking
alter column serviceName VARCHAR(MAX);

select * from booking

 drop table signin
SELECT * FROM signup;


DROP TABLE Booking;

CREATE TABLE Booking(
    BookingId INT PRIMARY KEY IDENTITY(1,1),

    uid INT NOT NULL,
    fullName VARCHAR(50),
    phoneNumber VARCHAR(20),
    address VARCHAR(100),
    date DATE,
    numberOfGuest INT,
    numberOfDays INT,
    functionTypes VARCHAR(50),

    image VARBINARY(MAX),        -- ✅ IMAGE
    serviceName VARCHAR(100),    -- ✅ SERVICE
    status VARCHAR(20) DEFAULT 'Pending'
);

ALTER TABLE Booking
ADD CONSTRAINT FK_Booking_User
FOREIGN KEY (uid) REFERENCES signup(uid);