package server

import (
	"github.com/SOMAS2020/SOMAS2020/internal/clients/team1"
	"github.com/SOMAS2020/SOMAS2020/internal/common/baseclient"
	"github.com/SOMAS2020/SOMAS2020/internal/common/shared"
)

type ClientFactory func(shared.ClientID) baseclient.Client

func DefaultClientConfig() map[shared.ClientID]ClientFactory {
	return map[shared.ClientID]ClientFactory{
		shared.Team1: team1.DefaultClient,
		shared.Team2: team1.DefaultClient,
		shared.Team3: team1.DefaultClient,
		shared.Team4: team1.DefaultClient,
		shared.Team5: team1.DefaultClient,
		shared.Team6: team1.DefaultClient,
	}
}

func ROIClientConfig() map[shared.ClientID]ClientFactory {
	return map[shared.ClientID]ClientFactory{
		shared.Team1: team1.ROIClient,
		shared.Team2: team1.ROIClient,
		shared.Team3: team1.ROIClient,
		shared.Team4: team1.ROIClient,
		shared.Team5: team1.ROIClient,
		shared.Team6: team1.ROIClient,
	}
}

func RegressionClientConfig() map[shared.ClientID]ClientFactory {
	return map[shared.ClientID]ClientFactory{
		shared.Team1: team1.RegressionClient,
		shared.Team2: team1.RegressionClient,
		shared.Team3: team1.RegressionClient,
		shared.Team4: team1.RegressionClient,
		shared.Team5: team1.RegressionClient,
		shared.Team6: team1.RegressionClient,
	}
}
