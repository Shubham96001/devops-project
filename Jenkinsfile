pipeline {
    agent any

    stages {
        stage('Checkout Source Code') {
            steps {
                git branch: 'main', url: 'https://github.com/Shubham96001/devops-project.git'
            }
        }
        stage('Build Docker Image') {
            steps {
                sh 'docker build -t student-crud-app:latest .'
            }
        }
        stage('Deploy Container') {
            steps {
                sh '''
                docker stop student-crud-container || true
                docker rm student-crud-container || true
                docker run -d -p 8080:3000 --name student-crud-container student-crud-app:latest
                '''
            }
        }
    }
}