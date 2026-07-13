import { useState, useEffect } from 'react';

export interface CPStats {
  codeforces: {
    handle: string;
    rating: number;
    maxRating: number;
    rank: string;
    maxRank: string;
    solvedCount: number;
    ratingHistory: Array<{ contestId: number; contestName: string; rank: number; ratingUpdateTimeSeconds: number; oldRating: number; newRating: number }>;
    tagStats: Record<string, number>;
    ratingStats: Record<number, number>;
    submissionCalendar: Record<string, number>; // date string "YYYY-MM-DD" -> count
    avatar: string;
    loading: boolean;
    error: boolean;
    source: 'api' | 'cache';
  };
  leetcode: {
    handle: string;
    totalSolved: number;
    easySolved: number;
    mediumSolved: number;
    hardSolved: number;
    ranking: number;
    loading: boolean;
    error: boolean;
    source: 'api' | 'cache';
  };
  codechef: {
    handle: string;
    rating: number;
    maxRating: number;
    stars: string;
    solvedCount: number;
    source: 'cache';
  };
}

// Fallback values from resumes
const STATIC_FALLBACK: CPStats = {
  codeforces: {
    handle: 'Drumil',
    rating: 1281,
    maxRating: 1378,
    rank: 'pupil',
    maxRank: 'pupil',
    solvedCount: 1350,
    ratingHistory: [], // Will populate with some dummy points if API fails
    tagStats: {
      'greedy': 512,
      'math': 421,
      'implementation': 352,
      'constructive algorithms': 228,
      'brute force': 219,
      'sortings': 182,
      'dp': 117,
      'strings': 112,
      'number theory': 91,
      'binary search': 91,
      'data structures': 86,
      'two pointers': 66,
      'dfs and similar': 53,
      'games': 42,
      'graphs': 41,
      'bitmasks': 40,
      'trees': 28
    },
    ratingStats: {
      800: 380,
      900: 110,
      1000: 115,
      1100: 105,
      1200: 105,
      1300: 85,
      1400: 70,
      1500: 52
    },
    submissionCalendar: {},
    avatar: 'https://userpic.codeforces.org/no-title.jpg',
    loading: false,
    error: false,
    source: 'cache'
  },
  leetcode: {
    handle: 'drumilbhati',
    totalSolved: 1200,
    easySolved: 350,
    mediumSolved: 600,
    hardSolved: 250,
    ranking: 45000,
    loading: false,
    error: false,
    source: 'cache'
  },
  codechef: {
    handle: 'drumilbhati',
    rating: 1611,
    maxRating: 1611,
    stars: '3★',
    solvedCount: 1200,
    source: 'cache'
  }
};

// Simple helper to convert timestamp to "YYYY-MM-DD"
const formatDate = (timestamp: number): string => {
  const date = new Date(timestamp * 1000);
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  const dd = String(date.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
};

export const useCPStats = () => {
  const [stats, setStats] = useState<CPStats>(STATIC_FALLBACK);

  useEffect(() => {
    let isMounted = true;

    const fetchAllStats = async () => {
      // 1. Fetch Codeforces Info
      let cfInfo: any = null;
      let cfRating: any = null;
      let cfStatus: any = null;
      let cfError = false;

      try {
        const infoRes = await fetch('https://codeforces.com/api/user.info?handles=Drumil');
        if (infoRes.ok) {
          const infoJson = await infoRes.json();
          if (infoJson.status === 'OK') {
            cfInfo = infoJson.result[0];
          }
        }
      } catch (e) {
        console.error('Error fetching Codeforces user.info:', e);
        cfError = true;
      }

      try {
        const ratingRes = await fetch('https://codeforces.com/api/user.rating?handle=Drumil');
        if (ratingRes.ok) {
          const ratingJson = await ratingRes.json();
          if (ratingJson.status === 'OK') {
            cfRating = ratingJson.result;
          }
        }
      } catch (e) {
        console.error('Error fetching Codeforces user.rating:', e);
      }

      try {
        const statusRes = await fetch('https://codeforces.com/api/user.status?handle=Drumil');
        if (statusRes.ok) {
          const statusJson = await statusRes.json();
          if (statusJson.status === 'OK') {
            cfStatus = statusJson.result;
          }
        }
      } catch (e) {
        console.error('Error fetching Codeforces user.status:', e);
      }

      if (isMounted) {
        setStats(prev => {
          const newStats = { ...prev };

          // Update Codeforces
          if (cfInfo) {
            newStats.codeforces = {
              ...newStats.codeforces,
              rating: cfInfo.rating ?? prev.codeforces.rating,
              maxRating: cfInfo.maxRating ?? prev.codeforces.maxRating,
              rank: cfInfo.rank ?? prev.codeforces.rank,
              maxRank: cfInfo.maxRank ?? prev.codeforces.maxRank,
              avatar: cfInfo.avatar ?? prev.codeforces.avatar,
              source: 'api'
            };
          }

          if (cfRating && cfRating.length > 0) {
            newStats.codeforces.ratingHistory = cfRating.map((r: any) => ({
              contestId: r.contestId,
              contestName: r.contestName,
              rank: r.rank,
              ratingUpdateTimeSeconds: r.ratingUpdateTimeSeconds,
              oldRating: r.oldRating,
              newRating: r.newRating
            }));
          }

          if (cfStatus && cfStatus.length > 0) {
            // Calculate actual stats from status
            const solvedProblems = new Set<string>();
            const tagCounts: Record<string, number> = {};
            const ratingCounts: Record<number, number> = {};
            const calendar: Record<string, number> = {};

            cfStatus.forEach((sub: any) => {
              if (sub.verdict === 'OK') {
                const problemKey = `${sub.problem.contestId}-${sub.problem.index}`;
                
                // Only count unique solved problems
                if (!solvedProblems.has(problemKey)) {
                  solvedProblems.add(problemKey);

                  // Tags
                  if (sub.problem.tags) {
                    sub.problem.tags.forEach((tag: string) => {
                      tagCounts[tag] = (tagCounts[tag] || 0) + 1;
                    });
                  }

                  // Rating
                  if (sub.problem.rating) {
                    ratingCounts[sub.problem.rating] = (ratingCounts[sub.problem.rating] || 0) + 1;
                  }
                }
              }

              // Submission calendar
              const dateStr = formatDate(sub.creationTimeSeconds);
              calendar[dateStr] = (calendar[dateStr] || 0) + 1;
            });

            newStats.codeforces.solvedCount = solvedProblems.size > 0 ? solvedProblems.size : prev.codeforces.solvedCount;
            if (Object.keys(tagCounts).length > 0) {
              newStats.codeforces.tagStats = tagCounts;
            }
            if (Object.keys(ratingCounts).length > 0) {
              newStats.codeforces.ratingStats = ratingCounts;
            }
            newStats.codeforces.submissionCalendar = calendar;
          }

          newStats.codeforces.loading = false;
          newStats.codeforces.error = cfError;
          return newStats;
        });
      }

      // 2. Fetch Leetcode stats
      try {
        const lcRes = await fetch('https://leetcode-stats-api.herokuapp.com/drumilbhati');
        if (lcRes.ok) {
          const lcJson = await lcRes.json();
          if (lcJson.status === 'success' && isMounted) {
            setStats(prev => ({
              ...prev,
              leetcode: {
                handle: 'drumilbhati',
                totalSolved: lcJson.totalSolved,
                easySolved: lcJson.easySolved,
                mediumSolved: lcJson.mediumSolved,
                hardSolved: lcJson.hardSolved,
                ranking: lcJson.ranking,
                loading: false,
                error: false,
                source: 'api'
              }
            }));
            return;
          }
        }
      } catch (e) {
        console.error('Error fetching Leetcode via heroku API:', e);
      }

      try {
        const lcResAlt = await fetch('https://alfa-leetcode-api.onrender.com/drumilbhati/solved');
        if (lcResAlt.ok) {
          const lcJsonAlt = await lcResAlt.json();
          if (lcJsonAlt && isMounted) {
            setStats(prev => ({
              ...prev,
              leetcode: {
                handle: 'drumilbhati',
                totalSolved: lcJsonAlt.solvedProblem ?? prev.leetcode.totalSolved,
                easySolved: lcJsonAlt.easySolved ?? prev.leetcode.easySolved,
                mediumSolved: lcJsonAlt.mediumSolved ?? prev.leetcode.mediumSolved,
                hardSolved: lcJsonAlt.hardSolved ?? prev.leetcode.hardSolved,
                ranking: prev.leetcode.ranking,
                loading: false,
                error: false,
                source: 'api'
              }
            }));
            return;
          }
        }
      } catch (e) {
        console.error('Error fetching Leetcode via Alfa Render API:', e);
      }

      if (isMounted) {
        setStats(prev => ({
          ...prev,
          leetcode: {
            ...prev.leetcode,
            loading: false,
            error: true
          }
        }));
      }
    };

    fetchAllStats();

    return () => {
      isMounted = false;
    };
  }, []);

  return stats;
};
