pipeline {
    agent any

    stages {

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Test Jenkins') {
            steps {
                echo 'Jenkins + GitHub connection is working!'
            }
        }

        stage('Docker Check') {
            steps {
                sh 'docker --version'
                sh 'docker ps'
            }
        } 

        stage('AWS Test') {
    steps {
        withCredentials([
            [$class: 'AmazonWebServicesCredentialsBinding',
             credentialsId: 'aws-ecr-creds']
        ]) {
            sh 'aws sts get-caller-identity'
        }
    }
}
        stage('Build Backend Image') {
            steps {
                sh '''
                    docker build \
                      -t complete-devops-backend:latest \
                      ./backend
                '''
            }
        }

        stage('Build Frontend Image') {
            steps {
                sh '''
                    docker build \
                      -t complete-devops-frontend:latest \
                      ./frontend
                '''
            }
        }
    }

    post {
        success {
            echo 'CI pipeline completed successfully!'
        }

        failure {
            echo 'CI pipeline failed. Check the console output.'
        }
    }
}