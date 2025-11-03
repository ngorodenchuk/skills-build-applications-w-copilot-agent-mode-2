from django.test import TestCase
from .models import User, Team, Activity, Leaderboard, Workout

class ModelTests(TestCase):
    def test_team_creation(self):
        team = Team.objects.create(name='TestTeam')
        self.assertEqual(team.name, 'TestTeam')

    def test_user_creation(self):
        user = User.objects.create_user(username='testuser', email='test@example.com')
        self.assertEqual(user.email, 'test@example.com')

    def test_activity_creation(self):
        team = Team.objects.create(name='TestTeam')
        user = User.objects.create_user(username='testuser', email='test@example.com')
        activity = Activity.objects.create(name='Run', user=user, team=team)
        self.assertEqual(activity.name, 'Run')
        self.assertEqual(activity.user.email, 'test@example.com')
        self.assertEqual(activity.team.name, 'TestTeam')

    def test_leaderboard_creation(self):
        team = Team.objects.create(name='TestTeam')
        leaderboard = Leaderboard.objects.create(team=team, points=100)
        self.assertEqual(leaderboard.points, 100)

    def test_workout_creation(self):
        team = Team.objects.create(name='TestTeam')
        workout = Workout.objects.create(name='Cardio', description='Run fast', team=team)
        self.assertEqual(workout.name, 'Cardio')
        self.assertEqual(workout.team.name, 'TestTeam')
