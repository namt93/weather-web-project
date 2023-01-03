from fastapi import FastAPI, Response, status, HTTPException, Depends, APIRouter
from sqlalchemy.orm import Session
from .. import models, schemas, utils, oauth2
from ..database import get_db

router = APIRouter(
        prefix="/users",
        tags=['users']
)

@router.post("/", status_code = status.HTTP_201_CREATED, response_model=schemas.UserOut)
def create_user(user: schemas.UserCreate, db: Session = Depends(get_db)):

    # hash the password - user.password
    hashed_password = utils.hash(user.password)
    user.password = hashed_password

    new_user = models.User(**user.dict())
    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return new_user

@router.get("/{id}", response_model=schemas.UserOut)
def get_user(id: int, db: Session = Depends(get_db)):
    user = db.query(models.User).filter(models.User.id==id).first()
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"user with id: {id} does not exist" )
    return user

# Delete user
@router.delete("/{id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_user(id: int, db: Session = Depends(get_db), current_admin: int = Depends(oauth2.get_current_admin)):

    user = db.query(models.User).filter(models.User.id == id)

    if user.first() == None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"user with id: {id} does not exist")
    user.delete(synchronize_session=False)
    db.commit()

    return Response(status_code=status.HTTP_204_NO_CONTENT)


# update user
@router.put("/{id}", response_model=schemas.UserOut)
def update_user(id: int, updated_user: schemas.UserBase, db: Session = Depends(get_db), current_admin: int = Depends(oauth2.get_current_admin)):
    user_query = db.query(models.User).filter(models.User.id == id)
    user = user_query.first()

    # check the existence of user
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"record with id: {id} does not exist")

    # verify the user password
    if not utils.verify(updated_user.password, user.password):
        raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN, detail=f"invalid ")
    updated_user.password = user.password
    user_query.update(updated_user.dict(), synchronize_session=False)
    db.commit()
    return user_query.first()

