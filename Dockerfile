
FROM maven:3.5-jdk-8-alpine

EXPOSE 8080

ENV HOME /home/ubuntu/librarymanagment/

WORKDIR $HOME

COPY . $HOME

RUN ["mvn", "clean"]
RUN ["mvn", "install"]


CMD ["java","-jar", "/home/ubuntu/librarymanagment/target/LibraryManagement-0.0.1-SNAPSHOT.jar"]
