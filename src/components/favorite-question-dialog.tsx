"use client";

import { StarFilledIcon, StarIcon } from "@radix-ui/react-icons";

import { favoriteQuestion } from "@/server/actions/favorite-question";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

type FavoriteQuestionDialogProps = {
  questionId: string;
  isFavorite: boolean;
};

export function FavoriteQuestionDialog(props: FavoriteQuestionDialogProps) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button>
          {props.isFavorite ? (
            <StarFilledIcon className="mr-2 h-4 w-4 text-yellow-500" />
          ) : (
            <StarIcon className="mr-2 h-4 w-4 text-yellow-500" />
          )}
          {props.isFavorite ? "Remove from Favorites" : "Add to Favorites"}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            {props.isFavorite
              ? "This will remove the question from your favorites."
              : "This will add the question to your favorites."}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={async () => {
              await favoriteQuestion(props.questionId, !props.isFavorite);
            }}
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
