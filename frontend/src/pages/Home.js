import { useNavigate } from "react-router-dom";
import PitchComponent from "../components/PitchComponent";
import { usePitches } from "../hooks/usePitches";
import { DotsLoader } from "../components/Loading";

const Home = () => {
  const navigate = useNavigate();

  const { data: pitches, isLoading } = usePitches();

  const handlePitchClick = (pitch) => {
    navigate(`/pitch/${pitch.id}`);
  };

  return (
    <>
      {isLoading && <DotsLoader />}
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
        {/* Pitches Grid */}
        <div className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {pitches &&
                pitches.data &&
                pitches.data.length &&
                pitches.data.map((pitch) => (
                  <PitchComponent
                    key={pitch.id}
                    pitch={pitch}
                    onClick={() => handlePitchClick(pitch)}
                  />
                ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
