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
stage('ECR Login') {
    steps {
        withCredentials([
            [$class: 'AmazonWebServicesCredentialsBinding',
             credentialsId: 'aws-ecr-creds']
        ]) {
            sh '''
                aws ecr get-login-password --region ap-south-1 | \
                docker login --username AWS --password-stdin \
                227769753769.dkr.ecr.ap-south-1.amazonaws.com
            '''
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

stage('Push Backend Image to ECR') {
    steps {
        sh '''
            docker tag complete-devops-backend:latest \
            227769753769.dkr.ecr.ap-south-1.amazonaws.com/complete-devops-backend:latest

            docker push \
            227769753769.dkr.ecr.ap-south-1.amazonaws.com/complete-devops-backend:latest
        '''
    }
}

stage('Push Frontend Image to ECR') {
    steps {
        sh '''
            docker tag complete-devops-frontend:latest \
            227769753769.dkr.ecr.ap-south-1.amazonaws.com/complete-devops-frontend:latest

            docker push \
            227769753769.dkr.ecr.ap-south-1.amazonaws.com/complete-devops-frontend:latest
        '''
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