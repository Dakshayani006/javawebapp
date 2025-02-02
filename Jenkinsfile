
pipeline {
    agent any
    environment {
        DOCKER_IMAGE_NAME = "daksha006/train-schedule"
    }

    stages {
        stage('Build Docker Image') {
            steps {
                script {
                    app = docker.build(DOCKER_IMAGE_NAME)
                    app.inside {
                        sh 'echo Hello, World!'
                    }
                }
            }
        }
        stage('Push Docker Image') {
            steps {
                script {
                    docker.withRegistry('https://registry.hub.docker.com', 'docker_hub_login') {
                        app.push("${env.BUILD_NUMBER}")
                        app.push("latest")
                       }
                }
            }
        }
        stage('DeployToProduction') {
            steps {
                input 'Deploy to Dev Environment?'
                milestone(1)
                kubernetesDeploy(
                    credentialsType: 'KubeConfig',
                    kubeConfig: [path: '/var/lib/jenkins/.kube/config'],
                    configs: 'train-schedule-kube.yml',
                    enableConfigSubstitution: true
                )
            }
        }

         stage('RollBack') {
           steps {
             script {
                sh 'kubectl scale deployment test --replicas=5'
                sh 'kubectl set image deployment/test  test=test:1'
                sh 'kubectl rollout history deployment/test --revision=4'
                sh 'kubectl rollout undo deployment/test'

             }
           }
         }

    }
}
